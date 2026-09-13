import { PROPERTY_PLACEHOLDER_IMAGE } from "./properties";
import type { Estate } from "./types";

const desc =
  "A residential setting shaped by its character, security, lifestyle offering, architectural guidelines and community.";

export const estates: Estate[] = [
  {
    id: "e1",
    slug: "riverstone-security-estate",
    name: "Riverstone Security Estate",
    type: "Security Estate",
    location: { suburb: "Bryanston", city: "Johannesburg", province: "Gauteng" },
    summary: "Established security estate with generous stands and mature trees.",
    description: desc,
    amenities: ["24-hour manned security", "Biometric access", "Clubhouse", "Walking trails", "Tennis courts"],
    image: PROPERTY_PLACEHOLDER_IMAGE,
  },
  {
    id: "e2",
    slug: "meadowlands-lifestyle-estate",
    name: "Meadowlands Lifestyle Estate",
    type: "Lifestyle Estate",
    location: { suburb: "Midrand", city: "Johannesburg", province: "Gauteng" },
    summary: "A lifestyle estate with parks, a school and stands available to build on.",
    description: desc,
    amenities: ["Private school", "Parks & dams", "Cycling routes", "Retail centre", "Fibre to the home"],
    image: PROPERTY_PLACEHOLDER_IMAGE,
  },
  {
    id: "e3",
    slug: "acacia-residential-estate",
    name: "Acacia Residential Estate",
    type: "Residential Estate",
    location: { suburb: "Centurion", city: "Pretoria", province: "Gauteng" },
    summary: "A well-run residential estate suited to families and first-time buyers.",
    description: desc,
    amenities: ["Access control", "Playgrounds", "Communal pool", "Close to highways"],
    image: PROPERTY_PLACEHOLDER_IMAGE,
  },
];

export const getEstate = (slug: string) => estates.find((e) => e.slug === slug);
