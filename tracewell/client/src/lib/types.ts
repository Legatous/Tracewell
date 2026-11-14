export type Product = {
  slug: string;
  name: string;
  category: "Performance" | "Funnels" | "Errors" | "AI suggestions" | "Engagement";
  price: number;
  installs: number;
  rating: number;
  reviewCount: number;
  description: string;
  lastUpdated: string;
  framework: string;
  terminalPreview: { line: string; color: string }[];
};

export const products: Product[] = [
  {
    slug: "rage-click-panel",
    name: "Rage-click panel",
    category: "Engagement",
    price: 19,
    installs: 1204,
    rating: 4.8,
    reviewCount: 32,
    description:
      "Adds a terminal panel that surfaces rage-click hotspots in real time, ranked by frequency, with element selectors ready to hand to your dev team.",
    lastUpdated: "3 days ago",
    framework: "React, Vite",
    terminalPreview: [
      { line: "$ install rage-click-panel", color: "#666" },
      { line: "#hero-btn   x14", color: "#c792ea" },
      { line: ".nav-menu   x6", color: "#c792ea" },
      { line: "#footer-cta x2", color: "#c792ea" },
    ],
  },
  {
    slug: "coupon-logic",
    name: "Coupon logic",
    category: "Engagement",
    price: 29,
    installs: 842,
    rating: 4.6,
    reviewCount: 18,
    description:
      "Drop-in coupon and discount-code handling for checkout flows, with Stripe-ready validation and expiry rules.",
    lastUpdated: "1 week ago",
    framework: "React, Node/Express, Stripe",
    terminalPreview: [
      { line: "$ install coupon-logic", color: "#666" },
      { line: "code SAVE20   valid", color: "#3ddc84" },
      { line: "code EXPIRED  rejected", color: "#e24b4a" },
    ],
  },
  {
    slug: "popup-modal-kit",
    name: "Popup / modal kit",
    category: "Engagement",
    price: 15,
    installs: 2031,
    rating: 4.7,
    reviewCount: 51,
    description:
      "Configurable exit-intent and timed popup templates, tracked automatically for open and conversion rate.",
    lastUpdated: "2 days ago",
    framework: "React, vanilla JS",
    terminalPreview: [
      { line: "$ install popup-modal-kit", color: "#666" },
      { line: "exit-intent   opens 340", color: "#7fb4ff" },
      { line: "conversion    12.4%", color: "#3ddc84" },
    ],
  },
];
