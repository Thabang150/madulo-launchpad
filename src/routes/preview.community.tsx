import { createFileRoute } from "@tanstack/react-router";
import { articles, futureFeatures } from "@/data/community";
import { SocialIcon } from "@/components/site/SocialIcon";
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
  { label: "Facebook", platform: "facebook" as const, href: siteConfig.social.facebook },
  { label: "TikTok", platform: "tiktok" as const, href: siteConfig.social.tiktok },
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
            Follow Madulo Properties for property stories, local insight and updates from our team.
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
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Madulo Properties on ${c.label}`}
                  className="inline-flex items-center gap-3 border border-border px-4 py-3 text-sm text-muted-foreground transition-colors duration-300 ease-premium hover:text-foreground"
                >
                  <SocialIcon platform={c.platform} className="size-5 text-gold" />
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-14">
        <p className="eyebrow">In development</p>
        <h2 className="mt-3 text-3xl text-foreground">More to explore</h2>
        <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {futureFeatures.map((f) => (
            <li key={f.title} className="bg-card p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base text-foreground">{f.title}</h3>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Planned</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
