import { PROPERTY_PLACEHOLDER_IMAGE } from "./properties";
import type { Development } from "./types";

const desc =
  "A development opportunity presented with attention to its setting, design, amenities, positioning and long-term potential.";

export const developments: Development[] = [
  {
    id: "d1",
    slug: "the-meadows-phase-two",
    name: "The Meadows — Phase Two",
    status: "selling",
    offPlan: true,
    location: { suburb: "Midrand", city: "Johannesburg", province: "Gauteng" },
    priceFrom: 1450000,
    unitTypes: [
      { name: "1 Bedroom", size: 52, priceFrom: 1450000, available: 14 },
      { name: "2 Bedroom", size: 78, priceFrom: 1950000, available: 22 },
      { name: "3 Bedroom", size: 104, priceFrom: 2650000, available: 6 },
    ],
    summary: "Off-plan apartments in a secure, well-positioned development.",
    description: desc,
    highlights: ["No transfer duty", "Secure access-controlled", "Backup power & water", "Clubhouse & pool", "Fibre ready"],
    completion: "To be confirmed",
    image: PROPERTY_PLACEHOLDER_IMAGE,
  },
  {
    id: "d2",
    slug: "ridgeview-townhouses",
    name: "Ridgeview Townhouses",
    status: "launching",
    offPlan: true,
    location: { suburb: "Centurion", city: "Pretoria", province: "Gauteng" },
    priceFrom: 2250000,
    unitTypes: [
      { name: "2 Bedroom Simplex", size: 110, priceFrom: 2250000, available: 18 },
      { name: "3 Bedroom Duplex", size: 156, priceFrom: 2890000, available: 24 },
    ],
    summary: "A new townhouse development launching soon — register your interest.",
    description: desc,
    highlights: ["Private gardens", "Double garages", "Solar-ready", "Pet friendly", "Close to schools"],
    completion: "To be confirmed",
    image: PROPERTY_PLACEHOLDER_IMAGE,
  },
  {
    id: "d3",
    slug: "station-square-mixed-use",
    name: "Station Square Mixed-Use",
    status: "under-construction",
    offPlan: false,
    location: { suburb: "Hatfield", city: "Pretoria", province: "Gauteng" },
    priceFrom: 1150000,
    unitTypes: [
      { name: "Studio", size: 36, priceFrom: 1150000, available: 30 },
      { name: "1 Bedroom", size: 48, priceFrom: 1490000, available: 12 },
      { name: "Retail Unit", size: 85, priceFrom: 3200000, available: 4 },
    ],
    summary: "Residential and retail units above a transit-connected precinct.",
    description: desc,
    highlights: ["Walk to Gautrain", "Ground-floor retail", "Rental demand", "Investor-friendly"],
    completion: "To be confirmed",
    image: PROPERTY_PLACEHOLDER_IMAGE,
  },
  {
    id: "d4",
    slug: "development-opportunity-east-rand",
    name: "Development Opportunity — East Rand",
    status: "launching",
    offPlan: true,
    location: { suburb: "Benoni", city: "Ekurhuleni", province: "Gauteng" },
    priceFrom: 0,
    unitTypes: [],
    summary: "A land parcel with development rights, presented for developers and investors.",
    description: desc,
    highlights: ["Development rights in place", "Bulk services available", "Main-road frontage"],
    completion: "Not applicable",
    image: PROPERTY_PLACEHOLDER_IMAGE,
  },
];

export const developmentStatusLabel: Record<Development["status"], string> = {
  launching: "Launching soon",
  selling: "Now selling",
  "under-construction": "Under construction",
  completed: "Completed",
};

export const getDevelopment = (slug: string) => developments.find((d) => d.slug === slug);
