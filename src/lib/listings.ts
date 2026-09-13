import { listings, type Listing } from "@/data/listings";

/**
 * Derived view of a scraped Property24 listing.
 * The shape below is what the UI consumes — swap the source in `allListings`
 * for an API call later without touching any component.
 */
export interface ListingView {
  id: string;
  listingNumber: string;
  price: string;
  priceValue: number;
  transaction: "sale" | "rent";
  propertyType: string;
  propertyTypeCategory: string;
  /** Broad grouping used by the category strip, e.g. "Residential". */
  category: string;
  bedrooms?: undefined | number;
  bathrooms?: undefined | number;
  parking?: undefined | number;
  size?: undefined | string;
  sizeValue?: undefined | number;
  listingDate?: undefined | string;
  description?: undefined | string;
  image?: undefined | string;
  suburb?: undefined | string;
  city?: undefined | string;
  province?: undefined | string;
  location: string;
  listingUrl: string;
}

const titleCase = (slug: string) =>
  slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

function numberOrUndefined(value: string): number | undefined {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function priceToNumber(price: string): number {
  const digits = price.replace(/[^\d]/g, "");
  return digits ? Number.parseInt(digits, 10) : 0;
}

function sizeToNumber(size: string): number | undefined {
  const digits = size.replace(/[^\d.]/g, "");
  const n = Number.parseFloat(digits);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function propertyTypeCategoryOf(propertyType: string): string {
  const type = propertyType.toLowerCase();
  if (type.includes("apartment")) return "Apartment";
  if (type.includes("townhouse")) return "Townhouse";
  if (type.includes("house")) return "House";
  if (type.includes("land") || type.includes("farm") || type.includes("plot")) return "Vacant Land";
  return propertyType;
}

function categoryOf(propertyType: string): string {
  const t = propertyType.toLowerCase();
  if (t.includes("land") || t.includes("farm") || t.includes("plot")) return "Land & Development";
  if (t.includes("office") || t.includes("retail") || t.includes("industrial") || t.includes("warehouse"))
    return "Commercial";
  return "Residential";
}

function fromUrl(url: string) {
  // https://www.property24.com/for-sale/<suburb>/<city>/<province>/<id>/<listing>
  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    const transaction: "sale" | "rent" = parts[0] === "to-rent" ? "rent" : "sale";
    return {
      transaction,
      suburb: parts[1] ? titleCase(parts[1]) : undefined,
      city: parts[2] ? titleCase(parts[2]) : undefined,
      province: parts[3] ? titleCase(parts[3]) : undefined,
    };
  } catch {
    return { transaction: "sale" as const, suburb: undefined, city: undefined, province: undefined };
  }
}

function toView(l: Listing): ListingView {
  const { transaction, suburb, city, province } = fromUrl(l.listingUrl);
  return {
    id: l.id,
    listingNumber: l.listingNumber,
    price: l.price,
    priceValue: priceToNumber(l.price),
    transaction,
    propertyType: l.propertyType,
    propertyTypeCategory: propertyTypeCategoryOf(l.propertyType),
    category: categoryOf(l.propertyType),
    bedrooms: numberOrUndefined(l.bedrooms),
    bathrooms: numberOrUndefined(l.bathrooms),
    parking: numberOrUndefined(l.parkingSpaces),
    size: l.erfSize?.trim() || undefined,
    sizeValue: sizeToNumber(l.erfSize),
    listingDate: l.listingDate?.trim() || undefined,
    description: l.abbreviated?.trim() || undefined,
    image: l.galleryImgs?.[0],
    suburb,
    city,
    province,
    location: [suburb, city].filter(Boolean).join(", "),
    listingUrl: l.listingUrl,
  };
}

export const allListings: ListingView[] = listings.map(toView);

export const propertyTypeOptions = Array.from(new Set(allListings.map((l) => l.propertyTypeCategory))).sort();

export const locationOptions = Array.from(
  new Set(allListings.flatMap((l) => [l.suburb, l.city].filter(Boolean) as string[])),
).sort();

export const categoryOptions = Array.from(new Set(allListings.map((l) => l.category))).sort();

export interface ListingFilters {
  transaction: "sale" | "rent";
  location: string;
  propertyType: string;
  category: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  bedrooms?: number | undefined;
  bathrooms?: number | undefined;
  parking?: number | undefined;
  minSize?: number | undefined;
  maxSize?: number | undefined;
}

export const emptyFilters: ListingFilters = {
  transaction: "sale",
  location: "",
  propertyType: "",
  category: "",
};

export function filterListings(items: ListingView[], f: ListingFilters): ListingView[] {
  const q = f.location.trim().toLowerCase();
  return items.filter((l) => {
    if (l.transaction !== f.transaction) return false;
    if (f.propertyType && l.propertyTypeCategory !== f.propertyType) return false;
    if (f.category && l.category !== f.category) return false;
    if (q && !`${l.suburb ?? ""} ${l.city ?? ""} ${l.province ?? ""}`.toLowerCase().includes(q)) return false;
    if (f.minPrice !== undefined && l.priceValue < f.minPrice) return false;
    if (f.maxPrice !== undefined && l.priceValue > f.maxPrice) return false;
    if (f.bedrooms !== undefined && (l.bedrooms ?? 0) < f.bedrooms) return false;
    if (f.bathrooms !== undefined && (l.bathrooms ?? 0) < f.bathrooms) return false;
    if (f.parking !== undefined && (l.parking ?? 0) < f.parking) return false;
    if (f.minSize !== undefined && (l.sizeValue ?? 0) < f.minSize) return false;
    if (f.maxSize !== undefined && (l.sizeValue === undefined || l.sizeValue > f.maxSize)) return false;
    return true;
  });
}

/** A tasteful selection for the homepage — highest priced sale listings first. */
export const featuredListings = allListings
  .filter((l) => l.transaction === "sale")
  .sort((a, b) => b.priceValue - a.priceValue)
  .slice(0, 6);
