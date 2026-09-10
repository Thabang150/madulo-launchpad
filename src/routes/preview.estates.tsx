import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { estates } from "@/data/estates";
import { P } from "@/lib/paths";

const title = "Estates — Madulo Properties";
const description =
  "Security, lifestyle and residential estates presented by Madulo Properties. Speak to our team about living in an estate.";

export const Route = createFileRoute("/preview/estates")({
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
  component: EstatesPage,
});

function EstatesPage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">Estates</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">
            Security, lifestyle and residential estates
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Estate profiles below are placeholders until each estate is confirmed with us.
          </p>
        </div>
      </section>

      <section className="container-site py-12 lg:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {estates.map((e) => (
            <article
              key={e.id}
              className="flex flex-col overflow-hidden border border-border bg-card shadow-card transition-shadow duration-300 ease-premium hover:shadow-float"
            >
              <img
                src={e.image}
                alt={`${e.name} in ${e.location.suburb}`}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow">{e.type}</p>
                <h2 className="mt-3 text-xl text-foreground">{e.name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  {e.location.suburb}, {e.location.city}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{e.summary}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.amenities.slice(0, 4).map((a) => (
                    <li key={a} className="border border-border px-2 py-1 text-[11px] text-muted-foreground">
                      {a}
                    </li>
                  ))}
                </ul>

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
