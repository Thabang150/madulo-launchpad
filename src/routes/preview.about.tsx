import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Compass, Handshake, Heart, ShieldCheck, Sparkles } from "lucide-react";
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
    body: "Madulo Properties is a people-first property business rooted in the places we know and the relationships we build. We bring a considered, local perspective to homes, land, developments and commercial opportunities across South Africa.",
  },
  {
    heading: "Vision",
    body: "To help more people make confident property decisions while contributing to places that are well cared for, connected and built for the long term.",
  },
  {
    heading: "Mission",
    body: "We make property easier to navigate by presenting opportunities clearly, listening carefully to what clients need and connecting each person with the right next step.",
  },
  {
    heading: "Our approach",
    body: "From the first enquiry to the final decision, we value clear information, responsive communication and practical guidance. Every property deserves an honest story, and every client deserves time to make an informed choice.",
  },
];

const values: { name: string; description: string; icon: LucideIcon }[] = [
  { name: "Integrity", description: "We communicate honestly and do what we say.", icon: ShieldCheck },
  { name: "Clarity", description: "We make the important details easier to understand.", icon: Compass },
  { name: "Care", description: "We listen closely and treat each client with respect.", icon: Heart },
  { name: "Craft", description: "We give every property the thoughtful attention it deserves.", icon: Sparkles },
  { name: "Community", description: "We believe property should strengthen a sense of place.", icon: Handshake },
];

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
            {values.map((value) => {
              const Icon = value.icon;
              return (
              <li key={value.name} className="bg-card p-6">
                <Icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="mt-5 text-sm font-semibold text-foreground">{value.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{value.description}</p>
              </li>
              );
            })}
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
