/**
 * Data shapes for the frontend. These mirror what the future API is expected to
 * return; swap the mock modules in src/data/ for API calls without touching UI.
 */

export type PropertyCategory = "residential" | "commercial" | "land" | "investment";
export type ListingType = "sale" | "rent";

export interface PropertyLocation {
  suburb: string;
  city: string;
  province: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  category: PropertyCategory;
  /** Human-readable type e.g. "House", "Office", "Vacant Land" */
  type: string;
  listing: ListingType;
  status?: "available" | "under-offer" | "sold" | "let";
  location: PropertyLocation;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  parking?: number;
  /** Floor / building size in m² */
  size: number;
  /** Land / erf size in m² */
  erf?: number;
  description: string;
  features: string[];
  featured?: boolean;
  tags?: string[];
  agentId: string;
  estateSlug?: string;
  image: string;
}

export interface Development {
  id: string;
  slug: string;
  name: string;
  status: "launching" | "selling" | "under-construction" | "completed";
  offPlan: boolean;
  location: PropertyLocation;
  priceFrom: number;
  unitTypes: { name: string; size: number; priceFrom: number; available: number }[];
  summary: string;
  description: string;
  highlights: string[];
  completion: string;
  image: string;
}

export interface Estate {
  id: string;
  slug: string;
  name: string;
  type: "Security Estate" | "Lifestyle Estate" | "Residential Estate";
  location: PropertyLocation;
  summary: string;
  description: string;
  amenities: string[];
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  group: "management" | "team";
  bio: string;
  phone: string;
  email: string;
  initials: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
}
