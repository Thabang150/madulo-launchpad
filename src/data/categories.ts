export interface CategoryLink {
  slug: string;
  name: string;
  description: string;
  types: string[];
  /** Where the category card navigates within the site (relative to basePath). */
  href: "/properties" | "/developments" | "/estates";
  search?: Record<string, string>;
}

export const categories: CategoryLink[] = [
  {
    slug: "residential",
    name: "Residential",
    description: "Houses, apartments, townhouses, duplexes and luxury homes.",
    types: ["Houses", "Apartments / Flats", "Townhouses", "Duplexes", "Luxury"],
    href: "/properties",
    search: { category: "residential" },
  },
  {
    slug: "commercial",
    name: "Commercial",
    description: "Offices, retail, industrial, warehouses and commercial buildings.",
    types: ["Offices", "Retail", "Industrial", "Warehouses", "Commercial buildings"],
    href: "/properties",
    search: { category: "commercial" },
  },
  {
    slug: "land",
    name: "Land & Development",
    description: "Vacant land, farms, development land and investment opportunities.",
    types: ["Vacant land", "Farms", "Development land", "Investment"],
    href: "/properties",
    search: { category: "land" },
  },
  {
    slug: "new-developments",
    name: "New Developments",
    description: "New and off-plan developments and development opportunities.",
    types: ["New developments", "Off-plan", "Opportunities"],
    href: "/developments",
  },
  {
    slug: "estates",
    name: "Estates",
    description: "Security, lifestyle and residential estates.",
    types: ["Security estates", "Lifestyle estates", "Residential estates"],
    href: "/estates",
  },
  {
    slug: "rentals",
    name: "Rentals",
    description: "Residential and commercial rentals.",
    types: ["Residential rentals", "Commercial rentals"],
    href: "/properties",
    search: { listing: "rent" },
  },
  {
    slug: "investment",
    name: "Investment Opportunities",
    description: "Income-generating and growth-focused property opportunities.",
    types: ["Income-generating", "Growth", "Portfolios"],
    href: "/properties",
    search: { category: "investment" },
  },
];

export const propertyTypes = [
  "House",
  "Apartment",
  "Townhouse",
  "Duplex",
  "Luxury Home",
  "Office",
  "Retail",
  "Industrial",
  "Warehouse",
  "Commercial Building",
  "Vacant Land",
  "Farm",
  "Development Land",
];
