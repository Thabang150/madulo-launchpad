import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { team } from "@/data/team";
import type { TeamMember } from "@/data/types";

const title = "Our Team — Madulo Properties";
const description =
  "Meet the management and property team at Madulo Properties, and the culture behind how we work.";

export const Route = createFileRoute("/preview/team")({
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
  component: TeamPage,
});

function MemberCard({ m }: { m: TeamMember }) {
  return (
    <article className="flex flex-col border border-border bg-card p-6 shadow-card transition-shadow duration-300 ease-premium hover:shadow-float">
      <div className="flex h-14 w-14 items-center justify-center border border-border text-sm font-semibold tracking-[0.12em] text-muted-foreground">
        {m.initials}
      </div>
      <h3 className="mt-5 text-lg text-foreground">{m.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">{m.role}</p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
      <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <p className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {m.phone}
        </p>
        <p className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {m.email}
        </p>
      </div>
    </article>
  );
}

function TeamPage() {
  const management = team.filter((m) => m.group === "management");
  const consultants = team.filter((m) => m.group === "team");

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">Team</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">
            The people behind Madulo Properties
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Meet the people who bring a practical, personal approach to every property conversation.
          </p>
        </div>
      </section>

      <section className="container-site py-12 lg:py-16">
        <p className="eyebrow">Management</p>
        <h2 className="mt-3 text-3xl text-foreground">Leadership</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {management.map((m) => (
            <MemberCard key={m.id} m={m} />
          ))}
        </div>
      </section>

      <section className="container-site pb-12 lg:pb-16">
        <p className="eyebrow">Our team</p>
        <h2 className="mt-3 text-3xl text-foreground">Property professionals</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {consultants.map((m) => (
            <MemberCard key={m.id} m={m} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="container-site py-14">
          <p className="eyebrow">Culture</p>
          <h2 className="mt-3 max-w-xl text-3xl text-foreground">How we work together</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We support one another, listen carefully to our clients and hold ourselves to a high standard of clear,
            thoughtful service.
          </p>
        </div>
      </section>
    </>
  );
}
