import { useState } from "react";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import ContentCard, { type DummyItem } from "../components/ContentCard";
import { useAuth } from "../lib/auth";

const seed: DummyItem[] = [
  {
    id: "pp1",
    title: "Welcome discount",
    meta: "Engagement template · 2,031 installs · updated 2 days ago",
    description:
      "First-order email capture paired with a percentage-off coupon code, shown as a bottom-right slide-in by default. Base conversion rate is anchored to published 2026 benchmark data rather than a made-up number.",
    tag: "Template",
    stats: [
      { label: "Benchmark avg.", value: "5–8%" },
      { label: "Source", value: "SuperPopups" },
    ],
  },
  {
    id: "pp2",
    title: "Cart recovery",
    meta: "Engagement template · 842 installs · updated 1 week ago",
    description:
      "Exit-intent popup offering a small discount to complete checkout when a visitor shows signs of leaving with items still in cart. Highest-converting template in the set, matching published cart-recovery benchmark data.",
    tag: "Template",
    stats: [
      { label: "Benchmark avg.", value: "8–17%" },
      { label: "Top performers", value: "20–35%" },
    ],
  },
  {
    id: "pp3",
    title: "Back in stock alert",
    meta: "Engagement template · 1,204 installs · updated 3 days ago",
    description:
      "Email capture on out-of-stock product pages, sends a one-time notification when inventory is replenished. Treated as high-intent lead capture since the visitor already chose a specific item.",
    tag: "Template",
    stats: [
      { label: "Benchmark avg.", value: "5–8%" },
      { label: "Intent level", value: "High" },
    ],
  },
  {
    id: "pp4",
    title: "Free shipping progress bar",
    meta: "Engagement template · 615 installs · updated 5 days ago",
    description:
      "Non-intrusive bar showing how close a cart is to a free-shipping threshold, encouraging larger average order value rather than asking for contact info. No dismiss-prompt friction since it doesn't request anything.",
    tag: "Template",
    stats: [
      { label: "Function", value: "AOV lift" },
      { label: "Friction", value: "None" },
    ],
  },
];

export default function Popups() {
  const { user } = useAuth();
  const [items, setItems] = useState(seed);

  function addItem() {
    const id = `pp${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id,
        title: "New template",
        meta: "Add category / install count / last updated",
        description: "Add a description of what this template does.",
        tag: "Template",
        stats: [],
      },
    ]);
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-xl font-medium">Popups</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Ready-made popup templates, each backed by real benchmark data. Try the interactive
          drag-and-resize version on the{" "}
          <a href="/popup-demo" className="underline underline-offset-2 text-neutral-300">
            popup demo page
          </a>
          .
        </p>

        {user?.role === "admin" && (
          <button
            onClick={addItem}
            className="mt-4 rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
          >
            + New template
          </button>
        )}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} onDelete={deleteItem} userActionLabel="Install" />
          ))}
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
