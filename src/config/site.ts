/**
 * Central site configuration.
 * Central configuration for Madulo Properties.
 */
export const siteConfig = {
  name: "Madulo Properties",
  domain: "maduloproperties.co.za",
  tagline: "Rooted in Heritage. Building Tomorrow.",
  description:
    "Madulo Properties — residential, commercial, land and development opportunities across South Africa.",

  /** Base path used by the website routes. */
  basePath: "/preview" as const,

  contact: {
    whatsappNumber: "27761890007",
    whatsappDefaultMessage: "Hello Madulo Properties, I would like to enquire about a property.",
    phone: "076 189 0007",
    email: "info@maduloproperties.co.za",
    address: "2025 Cnr Lucas Mangope & Jubilee Road, Kudube Unit 1, Temba, 0407",
    hours: "Closes at 18:00",
  },

  /** Active social channels. */
  social: {
    facebook: "https://www.facebook.com/groups/371013684173643/",
    tiktok: "https://www.tiktok.com/@madulo.africa.pro",
  },
};

export function whatsappLink(message = siteConfig.contact.whatsappDefaultMessage) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function phoneLink() {
  return `tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`;
}

export function emailLink(subject?: string) {
  return `mailto:${siteConfig.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
