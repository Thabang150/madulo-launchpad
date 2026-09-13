import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { P } from "@/lib/paths";
import { siteConfig } from "@/config/site";

const title = "About Madulo Properties — Rooted in Heritage";
const description =
  "Who Madulo Properties is, how we work with buyers, sellers, tenants and investors, and what guides our approach to property.";

export const Route = createFileRoute("/preview/about")({
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
  component: AboutPage,
});

const blocks = [
  {
    heading: "Our story",
    body: "Placeholder narrative. This section will carry the story of how Madulo Properties began, the people behind it and the communities it serves, once the details are supplied.",
  },
  {
    heading: "Vision",
    body: "Placeholder vision statement. A short, clear description of the future Madulo Properties is working towards.",
  },
  {
    heading: "Mission",
    body: "Placeholder mission statement. What the business does day to day, and for whom.",
  },
  {
    heading: "Our approach",
    body: "Placeholder description of how we work: how properties are presented, how clients are guided, and how each transaction is handled.",
  },
];

const values = ["Integrity", "Clarity", "Care", "Craft", "Community"];

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">About</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A property company built around people, place and the long term.
          </p>
        </div>
      </section>

      <section className="container-site grid gap-10 py-12 lg:grid-cols-2 lg:py-16">
        {blocks.map((b) => (
          <article key={b.heading} className="border-t border-border pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{b.heading}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
          </article>
        ))}
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site py-14">
          <p className="eyebrow">Values</p>
          <h2 className="mt-3 text-3xl text-foreground">What guides us</h2>
          <ul className="mt-8 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <li key={v} className="bg-card p-6 text-sm font-medium text-foreground">
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-14">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-foreground">Work with our team</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Whether you are buying, selling, renting or investing, we would like to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to={P.contact}>Contact us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={P.properties}>Browse properties</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
