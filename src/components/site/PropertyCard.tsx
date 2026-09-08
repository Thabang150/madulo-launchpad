import { BedDouble, Bath, Car, Maximize, MapPin } from "lucide-react";
import type { ListingView } from "@/lib/listings";

/**
 * Property card. The primary action opens the corresponding Property24
 * listing — no internal detail page exists at this stage.
 */
export function PropertyCard({ listing }: { listing: ListingView }) {
  const facts = [
    listing.bedrooms ? { icon: BedDouble, label: `${listing.bedrooms} Beds` } : null,
    listing.bathrooms ? { icon: Bath, label: `${listing.bathrooms} Bath` } : null,
    listing.parking ? { icon: Car, label: `${listing.parking} Parking` } : null,
    listing.size ? { icon: Maximize, label: listing.size } : null,
  ].filter(Boolean) as { icon: typeof BedDouble; label: string }[];

  return (
    <article className="group flex flex-col overflow-hidden border border-border bg-card shadow-card transition-shadow duration-300 ease-premium hover:shadow-float">
      <a href={listing.listingUrl} className="block overflow-hidden bg-muted" aria-label={`View ${listing.propertyType} on Property24`}>
        {listing.image ? (
          <img
            src={listing.image}
            alt={`${listing.propertyType} in ${listing.location || "South Africa"}`}
            loading="lazy"
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-premium group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[3/2] w-full" />
        )}
      </a>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-2xl text-foreground">
            {listing.price}
            {listing.transaction === "rent" && <span className="text-sm text-muted-foreground"> / month</span>}
          </p>
          <span className="eyebrow shrink-0">{listing.transaction === "rent" ? "To Rent" : "For Sale"}</span>
        </div>

        <h3 className="mt-2 text-sm font-medium text-foreground">{listing.propertyType}</h3>

        {listing.location && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {listing.location}
          </p>
        )}

        {facts.length > 0 && (
          <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            {facts.map((f) => (
              <li key={f.label} className="flex items-center gap-1.5">
                <f.icon className="h-3.5 w-3.5" aria-hidden="true" />
                {f.label}
              </li>
            ))}
          </ul>
        )}

        {listing.description && (
          <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{listing.description}</p>
        )}

        <a
          href={listing.listingUrl}
          className="mt-6 inline-flex w-fit items-center border-b border-gold pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors duration-300 ease-premium hover:text-gold"
        >
          View Property
        </a>
      </div>
    </article>
  );
}
