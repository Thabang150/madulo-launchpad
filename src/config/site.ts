/**
 * Central site configuration.
 * Every value here is a placeholder until Madulo Properties supplies real details.
 */
export const siteConfig = {
  name: "Madulo Properties",
  tagline: "Rooted in Heritage. Building Tomorrow.",
  description:
    "Madulo Properties — residential, commercial, land and development opportunities across South Africa.",

  /**
   * LAUNCH CONTROL
   * - `isLaunched: false`  → "/" shows the Coming Soon countdown; the real site lives at /preview.
   * - `isLaunched: true`   → "/" redirects to the real site.
   * At launch, move the files in src/routes/preview/ to src/routes/ and replace
   * the "/preview" prefix in links — no redesign or rebuild is required.
   */
  isLaunched: false,
  launchDate: "2026-09-14T00:00:00+02:00", // 14 September 2026, 00:00 SAST

  /** Base path of the real website while it is behind the countdown. */
  basePath: "/preview" as const,

  contact: {
    /** PLACEHOLDER — replace with the real WhatsApp number in international format, digits only. */
    whatsappNumber: "27000000000",
    whatsappDefaultMessage: "Hello Madulo Properties, I would like to enquire about a property.",
    /** PLACEHOLDER */
    phone: "+27 00 000 0000",
    /** PLACEHOLDER */
    email: "info@maduloproperties.example",
    /** PLACEHOLDER */
    address: "Address to be confirmed",
  },

  /** PLACEHOLDER social links — supply real URLs later. */
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    youtube: "#",
    tiktok: "#",
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
