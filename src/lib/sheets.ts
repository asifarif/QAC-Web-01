import "server-only";
import { cache } from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { z } from "zod";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

// Authenticated doc, memoized within a single render pass.
const getDoc = cache(async () => {
  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error("Missing Google Sheets environment variables.");
  }
  const jwt = new JWT({ email: CLIENT_EMAIL, key: PRIVATE_KEY, scopes: SCOPES });
  const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
  await doc.loadInfo();
  return doc;
});

// Generic loader: validate each row; skip (don't throw on) bad rows; [] on failure.
// fail-fast wrapper so a slow Google call can't hang the request
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`[sheets] ${label} timed out after ${ms}ms`)), ms),
    ),
  ]);
}

async function loadTab<T>(
  title: string,
  schema: z.ZodType<T>,
  columns: readonly string[],
): Promise<T[]> {
  // Keep this line ONLY if it's already there (preserves always-fresh updates):
  // noStore();
  const attempt = async (): Promise<T[]> => {
    const doc = await withTimeout(getDoc(), 8000, `load doc for "${title}"`);
    const sheet = doc.sheetsByTitle[title];
    if (!sheet) {
      console.error(`[sheets] Tab "${title}" not found.`);
      return [];
    }
    const rows = await withTimeout(sheet.getRows(), 8000, `getRows "${title}"`);
    const out: T[] = [];
    rows.forEach((row, i) => {
      const raw: Record<string, unknown> = {};
      for (const c of columns) raw[c] = row.get(c);
      const parsed = schema.safeParse(raw);
      if (parsed.success) out.push(parsed.data);
      else
        console.warn(
          `[sheets] Skipped "${title}" row ${i + 2}: ` +
            parsed.error.issues.map((x) => x.message).join("; "),
        );
    });
    return out;
  };

  try {
    return await attempt();
  } catch (err) {
    console.warn(`[sheets] "${title}" attempt 1 failed, retrying once:`, err);
    try {
      return await attempt();
    } catch (err2) {
      console.error(`[sheets] "${title}" failed after retry:`, err2);
      return [];
    }
  }
}


/* ----------------------------- activities ----------------------------- */
export const ACTIVITY_CATEGORY_ORDER = [
  "Survey", "Trainings", "HEC Visits", "Meetings", "Rankings", "Other Activities",
] as const;

const optionalNum = z.preprocess(
  (v) => (v === "" || v == null ? undefined : v),
  z.coerce.number().int().nonnegative().optional(),
);

const activitySchema = z.object({
  category: z.string().trim().min(1, "category is required"),
  sno: optionalNum,
  description: z.string().trim().min(1, "description is required"),
  scheduled_date: z.string().trim().optional().default(""),
});
export type Activity = z.infer<typeof activitySchema>;
export type ActivityGroup = { category: string; items: Activity[] };

export async function getActivities(): Promise<Activity[]> {
  const rows = await loadTab("activities", activitySchema, [
    "category", "sno", "description", "scheduled_date",
  ]);
  return rows.sort((a, b) => (a.sno ?? 1e9) - (b.sno ?? 1e9));
}

export function groupActivities(items: Activity[]): ActivityGroup[] {
  const map = new Map<string, Activity[]>();
  for (const it of items) {
    if (!map.has(it.category)) map.set(it.category, []);
    map.get(it.category)!.push(it);
  }
  const order = ACTIVITY_CATEGORY_ORDER as readonly string[];
  const rank = (c: string) => (order.indexOf(c) === -1 ? 999 : order.indexOf(c));
  return [...map.entries()]
    .sort(([a], [b]) => rank(a) - rank(b))
    .map(([category, items]) => ({ category, items }));
}

/* -------------------- other tabs (ready for later pages) -------------------- */
const quickLinkSchema = z.object({
  label: z.string().trim().min(1, "label is required"),
  url: z.string().trim().min(1, "url is required"),
  note: z.string().trim().optional().default(""),
});
export type QuickLink = z.infer<typeof quickLinkSchema>;
export const getQuickLinks = () =>
  loadTab("quick_links", quickLinkSchema, ["label", "url", "note"]);

const hitecLinkSchema = z.object({
  label: z.string().trim().min(1, "label is required"),
  url: z.string().trim().min(1, "url is required"),
});
export type HitecLink = z.infer<typeof hitecLinkSchema>;
export const getHitecLinks = () =>
  loadTab("hitec_links", hitecLinkSchema, ["label", "url"]);

const documentSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  category: z.string().trim().optional().default(""),
  date: z.string().trim().optional().default(""),
  file_url: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
});
export type DocumentItem = z.infer<typeof documentSchema>;
export const getDocuments = () =>
  loadTab("documents", documentSchema, ["title", "category", "date", "file_url", "description"]);

const achievementSchema = z.object({
  year: z.string().trim().optional().default(""),
  category: z.string().trim().optional().default(""),
  text: z.string().trim().min(1, "text is required"),
});
export type Achievement = z.infer<typeof achievementSchema>;
export const getAchievements = () =>
  loadTab("achievements", achievementSchema, ["year", "category", "text"]);

const kpiSchema = z.object({
  indicator: z.string().trim().min(1, "indicator is required"),
  target: z.string().trim().optional().default(""),
  current: z.string().trim().optional().default(""),
});
export type Kpi = z.infer<typeof kpiSchema>;
export const getKpis = () =>
  loadTab("kpis", kpiSchema, ["indicator", "target", "current"]);

/* ----------------------------- programmes ----------------------------- */
// Drives the Self-Assessment & Accreditation page. Each row is one programme.
//
// NOTE (review me): these helpers were added here because the file did not yet
// contain getProgrammes()/splitProgrammes(). The read/render columns are
// `programme | department | body | status`. The bucket a programme falls into
// (accredited / sarUndergrad / graduate) is decided by splitProgrammes() from a
// discriminator column — we read `category`, `track` and `level` and use
// whichever is present, so it matches whatever your "programmes" tab actually
// uses. If none is present we fall back to: has a council `body` -> accredited,
// otherwise -> sarUndergrad. Adjust `programmeTrack` if your sheet differs.
const programmeSchema = z.object({
  programme: z.string().trim().min(1, "programme is required"),
  department: z.string().trim().optional().default(""),
  body: z.string().trim().optional().default(""),
  status: z.string().trim().optional().default(""),
  category: z.string().trim().optional().default(""),
  track: z.string().trim().optional().default(""),
  level: z.string().trim().optional().default(""),
});
export type Programme = z.infer<typeof programmeSchema>;
export type ProgrammeGroups = {
  accredited: Programme[];
  sarUndergrad: Programme[];
  graduate: Programme[];
};

export const getProgrammes = () =>
  loadTab("programmes", programmeSchema, [
    "programme", "department", "body", "status", "category", "track", "level",
  ]);

function programmeTrack(p: Programme): keyof ProgrammeGroups {
  const hint = `${p.category} ${p.track} ${p.level}`.toLowerCase();
  // Order matters: "undergraduate" contains "grad", so test "under" first.
  if (hint.includes("under")) return "sarUndergrad";
  if (
    hint.includes("grad") ||
    hint.includes("phd") ||
    hint.includes("mphil") ||
    hint.includes("m.phil")
  )
    return "graduate";
  if (hint.includes("accredit") || hint.includes("council")) return "accredited";
  if (hint.includes("sar") || hint.includes("self")) return "sarUndergrad";
  // Fallback when no discriminator column is present.
  return p.body.trim() !== "" ? "accredited" : "sarUndergrad";
}

export function splitProgrammes(items: Programme[]): ProgrammeGroups {
  const groups: ProgrammeGroups = {
    accredited: [],
    sarUndergrad: [],
    graduate: [],
  };
  for (const p of items) groups[programmeTrack(p)].push(p);
  return groups;
}
/* -------------------------- team & liaison --------------------------- */
const teamSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  designation: z.string().trim().optional().default(""),
  order: optionalNum,
});
export type TeamMember = z.infer<typeof teamSchema>;
export async function getTeam(): Promise<TeamMember[]> {
  const rows = await loadTab("team", teamSchema, ["name", "designation", "order"]);
  return rows.sort((a, b) => (a.order ?? 1e9) - (b.order ?? 1e9));
}

const liaisonSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  designation: z.string().trim().optional().default(""),
  department: z.string().trim().optional().default(""),
  order: optionalNum,
});
export type LiaisonOfficer = z.infer<typeof liaisonSchema>;
export async function getLiaisonOfficers(): Promise<LiaisonOfficer[]> {
  const rows = await loadTab("Liaison", liaisonSchema, ["name", "designation", "department", "order"]);
  return rows.sort((a, b) => (a.order ?? 1e9) - (b.order ?? 1e9));
}
/* ----------------------------- memberships ----------------------------- */
const membershipSchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  category: z.string().trim().optional().default(""),
  logo: z.string().trim().optional().default(""),
  url: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  order: optionalNum,
});
export type Membership = z.infer<typeof membershipSchema>;
export async function getMemberships(): Promise<Membership[]> {
  const rows = await loadTab("memberships", membershipSchema, [
    "name", "category", "logo", "url", "description", "order",
  ]);
  return rows.sort((a, b) => (a.order ?? 1e9) - (b.order ?? 1e9));
}
/* --------------------------- important links --------------------------- */
const importantLinkSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  url: z.string().trim().min(1, "url is required"),
  category: z.string().trim().optional().default(""),
  description: z.string().trim().optional().default(""),
  order: optionalNum,
});
export type ImportantLink = z.infer<typeof importantLinkSchema>;
export async function getImportantLinks(): Promise<ImportantLink[]> {
  const rows = await loadTab("important_links", importantLinkSchema, [
    "title", "url", "category", "description", "order",
  ]);
  return rows.sort((a, b) => (a.order ?? 1e9) - (b.order ?? 1e9));
}