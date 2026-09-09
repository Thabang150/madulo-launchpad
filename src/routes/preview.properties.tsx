import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PropertyCard } from "@/components/site/PropertyCard";
import { PropertyFilters } from "@/components/site/PropertyFilters";
import { Button } from "@/components/ui/button";
import { allListings, emptyFilters, filterListings, type ListingFilters } from "@/lib/listings";

const title = "Properties for Sale & to Rent — Madulo Properties";
const description =
  "Browse the properties currently available through Madulo Properties. Filter by location, type, price, bedrooms and bathrooms.";

export interface PropertySearch {
  location?: string | undefined;
  type?: string | undefined;
  category?: string | undefined;
  transaction?: "all" | "sale" | "rent" | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  bedrooms?: number | undefined;
  bathrooms?: number | undefined;
}

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
const num = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export const Route = createFileRoute("/preview/properties")({
  validateSearch: (raw: Record<string, unknown>): PropertySearch => ({
    location: str(raw['location']),
    type: str(raw['type']),
    category: str(raw['category']),
    transaction:
      raw['transaction'] === "sale" || raw['transaction'] === "rent" ? raw['transaction'] : "all",
    minPrice: num(raw['minPrice']),
    maxPrice: num(raw['maxPrice']),
    bedrooms: num(raw['bedrooms']),
    bathrooms: num(raw['bathrooms']),
  }),
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
  component: PropertiesPage,
});

const transactionTabs = [
  { value: "all", label: "All listings" },
  { value: "sale", label: "For sale" },
  { value: "rent", label: "To rent" },
] as const;

function PropertiesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const initial: ListingFilters = {
    transaction: search.transaction ?? "all",
    location: search.location ?? "",
    propertyType: search.type ?? "",
    category: search.category ?? "",
    minPrice: search.minPrice,
    maxPrice: search.maxPrice,
    bedrooms: search.bedrooms,
    bathrooms: search.bathrooms,
  };

  const [draft, setDraft] = useState<ListingFilters>(initial);
  const results = useMemo(() => filterListings(allListings, initial), [search]);

  const apply = (f: ListingFilters) =>
    navigate({
      search: {
        location: f.location || undefined,
        type: f.propertyType || undefined,
        category: f.category || undefined,
        transaction: f.transaction,
        minPrice: f.minPrice,
        maxPrice: f.maxPrice,
        bedrooms: f.bedrooms,
        bathrooms: f.bathrooms,
      },
    });

  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container-site py-14 lg:py-16">
          <p className="eyebrow">Property search</p>
          <h1 className="mt-3 max-w-2xl text-4xl leading-tight text-foreground lg:text-5xl">
            Properties for sale and to rent
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Every listing below links through to its full Property24 page.
          </p>
        </div>
      </section>

      <section className="container-site py-10">
        <h2 className="sr-only">Filter properties</h2>
        <PropertyFilters
          value={draft}
          onChange={setDraft}
          variant="panel"
          onSubmit={() => apply(draft)}
          onReset={() => {
            setDraft(emptyFilters);
            apply(emptyFilters);
          }}
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{results.length}</span>{" "}
            {results.length === 1 ? "property" : "properties"} found
          </p>
          <div className="flex flex-wrap gap-2">
            {transactionTabs.map((t) => {
              const active = (initial.transaction ?? "all") === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    const next = { ...draft, transaction: t.value };
                    setDraft(next);
                    apply(next);
                  }}
                  className={`border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ease-premium ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l) => (
              <PropertyCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <div className="mt-16 border border-border bg-card p-12 text-center">
            <h3 className="text-2xl text-foreground">No properties match your search</h3>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              Try widening the price range or clearing a filter to see more listings.
            </p>
            <Button
              className="mt-6"
              onClick={() => {
                setDraft(emptyFilters);
                apply(emptyFilters);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </>
  );
}
