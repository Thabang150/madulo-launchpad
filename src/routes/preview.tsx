import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { siteConfig } from "@/config/site";

/** Main website layout. */
export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: siteConfig.name },
    ],
  }),
  component: PreviewLayout,
});

function PreviewLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
