"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { navItems, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex size-11 items-center justify-center rounded-lg bg-white p-1 shadow-sm">
        <Image
          src="/hitec-logo.svg"
          alt="HITEC University logo"
          width={36}
          height={36}
          className="size-9"
          priority
          unoptimized
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-sm font-semibold sm:text-base">
          Quality Assurance &amp; Collaborations
        </span>
        <span className="text-[11px] font-medium tracking-wider text-white/60 uppercase">
          HITEC University
        </span>
      </span>
    </Link>
  );
}

const desktopLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-active:bg-white/10 data-active:text-gold";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const [open, setOpen] = useState(false);
  // Which mobile group is expanded (auto-open the group holding the current page).
  const [expandedGroup, setExpandedGroup] = useState<string | null>(
    () =>
      navItems.find((item) =>
        item.children?.some((child) => pathname.startsWith(child.href)),
      )?.href ?? null,
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        {/* Desktop navigation */}
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) =>
              item.children ? (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuTrigger
                    className={cn(
                      "h-auto bg-transparent px-3 py-2 text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-open:bg-white/10 data-open:text-white data-open:hover:bg-white/10 data-open:focus:bg-white/10 data-popup-open:bg-white/10 data-popup-open:hover:bg-white/10",
                      isActive(item.href) && "text-gold",
                    )}
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-72 gap-1 p-2">
                      <li>
                        <NavigationMenuLink
                          asChild
                          active={pathname === item.href}
                          className="rounded-md px-3 py-2 text-sm font-semibold text-navy hover:bg-blue/10 hover:text-navy focus:bg-blue/10 focus:text-navy data-active:bg-blue data-active:text-white data-active:hover:bg-blue data-active:hover:text-white data-active:focus:bg-blue data-active:focus:text-white"
                        >
                          <Link href={item.href}>{item.title}@HITEC</Link>
                        </NavigationMenuLink>
                      </li>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink
                            asChild
                            active={isActive(child.href)}
                            className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-blue/10 hover:text-navy focus:bg-blue/10 focus:text-navy data-active:bg-blue data-active:text-white data-active:hover:bg-blue data-active:hover:text-white data-active:focus:bg-blue data-active:focus:text-white"
                          >
                            <Link href={child.href}>{child.title}</Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    asChild
                    active={isActive(item.href)}
                    className={desktopLinkClass}
                  >
                    <Link href={item.href}>{item.title}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="border-white/10 bg-navy text-white"
          >
            <SheetHeader className="flex-row items-center justify-between">
              <SheetTitle className="text-white">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Primary site navigation
              </SheetDescription>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close menu"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </Button>
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-2 pb-6">
              {navItems.map((item) =>
                item.children ? (
                  <MobileGroup
                    key={item.href}
                    item={item}
                    isActive={isActive}
                    expanded={expandedGroup === item.href}
                    onToggle={() =>
                      setExpandedGroup((current) =>
                        current === item.href ? null : item.href,
                      )
                    }
                  />
                ) : (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                        isActive(item.href) && "bg-white/10 text-gold",
                      )}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                ),
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileGroup({
  item,
  isActive,
  expanded,
  onToggle,
}: {
  item: NavItem;
  isActive: (href: string) => boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <div className="flex items-center">
        <SheetClose asChild>
          <Link
            href={item.href}
            className={cn(
              "flex-1 rounded-lg px-3 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white",
              isActive(item.href) && "text-gold",
            )}
          >
            {item.title}
          </Link>
        </SheetClose>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.title}`}
          className="rounded-lg p-3 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronDown
            className={cn(
              "size-5 transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>
      {expanded ? (
        <div className="mt-1 ml-3 flex flex-col gap-1 border-l border-white/10 pl-3">
          {item.children?.map((child) => (
            <SheetClose asChild key={child.href}>
              <Link
                href={child.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white",
                  isActive(child.href) && "bg-white/10 text-gold",
                )}
              >
                {child.title}
              </Link>
            </SheetClose>
          ))}
        </div>
      ) : null}
    </div>
  );
}
