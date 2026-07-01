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
async function loadTab<T>(
  title: string,
  schema: z.ZodType<T>,
  columns: readonly string[],
): Promise<T[]> {
  try {
    const doc = await getDoc();
    const sheet = doc.sheetsByTitle[title];
    if (!sheet) {
      console.error(`[sheets] Tab "${title}" not found.`);
      return [];
    }
    const rows = await sheet.getRows();
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
  } catch (err) {
    console.error(`[sheets] Failed to load "${title}":`, err);
    return [];
  }
}

const optionalNum = z.preprocess(
  (v) => (v === "" || v == null ? undefined : v),
  z.coerce.number().int().nonnegative().optional(),
);

/* ----------------------------- activities ----------------------------- */
export const ACTIVITY_CATEGORY_ORDER = [
  "Survey", "Trainings", "HEC Visits", "Meetings", "Rankings", "Other Activities",
] as const;

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