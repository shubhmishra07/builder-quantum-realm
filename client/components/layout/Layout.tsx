import { PropsWithChildren } from "react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-amber-50 text-foreground">
      <SiteHeader />
      <main className="container px-4 md:px-6 py-6 md:py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
