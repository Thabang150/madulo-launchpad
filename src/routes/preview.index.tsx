import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyFilters } from "@/components/site/PropertyFilters";
import { emptyFilters, featuredListings, categoryOptions } from "@/lib/listings";
import heroImage from "@/assets/madulo hero.jpg";
import { siteConfig } from "@/config/site";
import { P } from "@/lib/paths";

const title = "Madulo Properties — Discover Property Across South Africa";
const description =
  "Search residential, commercial and land listings with Madulo Properties. Find your place and connect with our team.";

export const Route = createFileRoute("/preview/")({
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
  component: HomePage,
});

const allCategories = [
  "Residential",
  "Commercial",
  "Land & Development",
  "Rentals",
  "Investment Opportunities",
];

function HomePage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(emptyFilters);

  const search = () =>
    navigate({
      to: P.properties,
      search: {
        location: filters.location || undefined,
        type: filters.propertyType || undefined,
        transaction: filters.transaction,
        category: undefined,
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      },
    });

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border">
        <div
          className="relative min-h-[620px] bg-cover bg-center py-20 lg:min-h-[680px] lg:py-28"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="container-site relative z-10">
            <p className="eyebrow animate-rise text-white/90">{siteConfig.tagline}</p>
            <h1 className="animate-rise delay-120 mt-6 max-w-3xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
              Discover property. Find your place. Connect with Madulo Properties.
            </h1>
            <p className="animate-rise delay-240 mt-6 max-w-xl text-base leading-relaxed text-white/80">
              Browse the properties we currently have available across South Africa, and speak to our team when you find
              one worth viewing.
            </p>

            <div className="animate-rise delay-360 mt-10 lg:mt-14">
              <h2 className="sr-only">Find your next property</h2>
              <PropertyFilters value={filters} onChange={setFilters} variant="bar" onSubmit={search} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-site py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Latest listings</p>
            <h2 className="mt-3 text-3xl text-foreground">Featured properties</h2>
          </div>
          <Button asChild variant="outline">
            <Link to={P.properties}>
              View All Properties <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3">
          {featuredListings.map((l) => (
            <PropertyCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-border bg-card">
        <div className="container-site py-20">
          <p className="eyebrow">Browse by category</p>
          <h2 className="mt-3 text-3xl text-foreground">Property categories</h2>
          <ul className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {allCategories.map((c) => {
              const live = categoryOptions.includes(c);
              return (
                <li key={c} className="bg-card">
                  {live ? (
                    <Link
                      to={P.properties}
                      search={{
                        category: c,
                        location: undefined,
                        type: undefined,
                        transaction: "all",
                        bedrooms: undefined,
                        bathrooms: undefined,
                      }}
                      className="flex h-full items-center justify-between gap-4 p-6 transition-colors duration-300 ease-premium hover:bg-accent"
                    >
                      <span className="text-sm font-medium text-foreground">{c}</span>
                      <ArrowRight className="h-4 w-4 text-gold" aria-hidden="true" />
                    </Link>
                  ) : (
                    <div className="flex h-full items-center justify-between gap-4 p-6">
                      <span className="text-sm font-medium text-muted-foreground">{c}</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Coming soon</span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Connect */}
      <section className="container-site py-20">
        <div className="max-w-2xl">
          <p className="eyebrow">Connect</p>
          <h2 className="mt-3 text-3xl text-foreground">Speak to the Madulo Properties team</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Tell us what you are looking for and we will help you take the next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to={P.contact}>Enquire</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={P.calculators}>Property calculators</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
