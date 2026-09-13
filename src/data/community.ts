import type { Article } from "./types";

/** Editorial topics for the Madulo journal. */
export const articles: Article[] = [
  {
    id: "a1",
    slug: "first-time-buyer-checklist",
    title: "A calm, practical checklist for first-time buyers",
    category: "Buying",
    excerpt: "A short, useful guide to the steps between deciding to buy and receiving your keys.",
    date: "Madulo journal",
    readTime: "5 min read",
  },
  {
    id: "a2",
    slug: "preparing-your-home-to-sell",
    title: "Preparing your home to sell well",
    category: "Selling",
    excerpt: "What matters, what doesn't, and how to present a property honestly and beautifully.",
    date: "Madulo journal",
    readTime: "4 min read",
  },
  {
    id: "a3",
    slug: "reading-the-market",
    title: "Reading the market without the noise",
    category: "Market Insights",
    excerpt: "A measured view of trends that actually affect buyers, sellers and investors.",
    date: "Madulo journal",
    readTime: "6 min read",
  },
  {
    id: "a4",
    slug: "property-as-an-investment",
    title: "Thinking about property as a long-term investment",
    category: "Investment",
    excerpt: "Yield, growth, and the questions worth asking before you commit.",
    date: "Madulo journal",
    readTime: "7 min read",
  },
];

export const futureFeatures = [
  {
    title: "Live Property Viewings",
    description: "Online walkthroughs where audiences can watch a property in real time and ask questions as they go.",
  },
  {
    title: "Interactive Live Assistant",
    description: "An automated assistant to answer questions and guide viewers during live property experiences.",
  },
  {
    title: "Online Property Auctions",
    description: "A transparent, online auction experience for selected properties.",
  },
  {
    title: "Weekly Competitions",
    description: "Competitions, giveaways and community engagement for our audience.",
  },
];
