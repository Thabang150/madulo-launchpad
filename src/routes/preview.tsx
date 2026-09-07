import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";
import { siteConfig } from "@/config/site";

/**
 * Temporary stand-in for the real website while it is built underneath the
 * public countdown. This file will become the site layout.
 */
export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — Preview` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <Logo to={P_preview_home} size="lg" />
      <h1 className="font-display text-3xl text-foreground">The website is in development</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        This is where the full Madulo Properties website will appear for client preview.
      </p>
    </main>
  );
}

const P_preview_home = "/preview";
