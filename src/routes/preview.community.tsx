import { createFileRoute } from "@tanstack/react-router";
import { articles, futureFeatures } from "@/data/community";
import { siteConfig } from "@/config/site";

const title = "Community — Madulo Properties";
const description =
  "Articles, social media, video and podcasts from Madulo Properties, plus a look at what we are building next.";

export const Route = createFileRoute("/preview/community")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

const channels = [
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "YouTube", href: siteConfig.social.youtube },
  { label: "TikTok", href: siteConfig.social.tiktok },
];

function CommunityPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">Community</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">
            Stories, insight and conversation
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Our content hub is being built. Articles, video and podcast episodes will be published here.
          </p>
        </div>
      </section>

      <section className="container-site py-12 lg:py-16">
        <p className="eyebrow">Articles</p>
        <h2 className="mt-3 text-3xl text-foreground">From the Madulo journal</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((a) => (
            <li key={a.id} className="flex flex-col border border-border bg-card p-6">
              <p className="eyebrow">{a.category}</p>
              <h3 className="mt-3 text-lg leading-snug text-foreground">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                {a.date} · {a.readTime}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site py-14">
          <p className="eyebrow">Channels</p>
          <h2 className="mt-3 text-3xl text-foreground">Follow along</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="inline-flex items-center border border-border px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 ease-premium hover:text-foreground"
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">Social links will be connected once the accounts are confirmed.</p>
        </div>
      </section>

      <section className="container-site py-14">
        <p className="eyebrow">Coming soon</p>
        <h2 className="mt-3 text-3xl text-foreground">More is on the way</h2>
        <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {futureFeatures.map((f) => (
            <li key={f.title} className="bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base text-foreground">{f.title}</h3>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Soon</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
