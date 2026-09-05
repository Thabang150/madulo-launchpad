/**
 * Route literals for the real website while it lives under /preview.
 * At launch, drop the prefix here and move src/routes/preview/* up a level.
 */
export const P = {
  home: "/preview",
  properties: "/preview/properties",
  property: "/preview/properties/$slug",
  developments: "/preview/developments",
  development: "/preview/developments/$slug",
  estates: "/preview/estates",
  estate: "/preview/estates/$slug",
  about: "/preview/about",
  team: "/preview/team",
  community: "/preview/community",
  contact: "/preview/contact",
  login: "/preview/account/login",
  register: "/preview/account/register",
  forgot: "/preview/account/forgot-password",
  account: "/preview/account",
  onboarding: "/preview/account/onboarding",
} as const;
