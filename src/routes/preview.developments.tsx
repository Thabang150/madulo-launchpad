import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { developments, developmentStatusLabel } from "@/data/developments";
import { formatPrice, formatSize } from "@/lib/format";
import { P } from "@/lib/paths";

const title = "New Developments — Madulo Properties";
const description =
  "New and off-plan development opportunities presented by Madulo Properties. Register your interest with our team.";

export const Route = createFileRoute("/preview/developments")({
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
  component: DevelopmentsPage,
});

function DevelopmentsPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">Developments</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">
            New and off-plan developments
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Project details below are placeholders while we prepare each development. Speak to our team to register
            your interest.
          </p>
        </div>
      </section>

      <section className="container-site py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {developments.map((d) => (
            <article
              key={d.id}
              className="flex flex-col overflow-hidden border border-border bg-card shadow-card transition-shadow duration-300 ease-premium hover:shadow-float"
            >
              <img
                src={d.image}
                alt={`${d.name} in ${d.location.suburb}`}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow">{developmentStatusLabel[d.status]}</p>
                <h2 className="mt-3 text-xl text-foreground">{d.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {d.location.suburb}, {d.location.city}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{d.summary}</p>

                {d.priceFrom > 0 && (
                  <p className="mt-4 font-display text-2xl text-foreground">{formatPrice(d.priceFrom, { from: true })}</p>
                )}

                {d.unitTypes.length > 0 && (
                  <ul className="mt-4 space-y-1 text-xs text-muted-foreground">
                    {d.unitTypes.map((u) => (
                      <li key={u.name} className="flex justify-between gap-3 border-t border-border pt-1">
                        <span>{u.name}</span>
                        <span>{formatSize(u.size)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={P.contact}>
                      Enquire <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
