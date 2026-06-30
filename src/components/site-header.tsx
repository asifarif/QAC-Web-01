"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
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

function useIsActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
}

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

export function SiteHeader() {
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        {/* Desktop navigation */}
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  asChild
                  active={isActive(item.href)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white data-active:bg-white/10 data-active:text-gold"
                >
                  <Link href={item.href}>{item.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
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
              {navItems.map((item) => (
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
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
