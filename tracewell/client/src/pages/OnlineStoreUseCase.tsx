import { useState } from "react";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import ContentCard, { type DummyItem } from "../components/ContentCard";
import CaseStudyModal from "../components/CaseStudyModal";
import { useAuth } from "../lib/auth";

const seed: DummyItem[] = [
  {
    id: "os1",
    title: "Halden & Rowe — checkout funnel fix",
    meta: "Home goods e-commerce · scanned Nov 2025 · 2-week engagement",
    description:
      "Checkout required creating an account before payment, with no visible guest option. The funnel view showed roughly a third of carts abandoned at that exact step. Added a guest checkout path and kept account creation as an optional step after purchase.",
    tag: "Case study",
    stats: [
      { label: "Checkout completion", value: "+19%" },
      { label: "Guest checkouts", value: "61% of orders" },
    ],
  },
  {
    id: "os2",
    title: "Solace Skincare — popup timing tune",
    meta: "Beauty / DTC · scanned Oct 2025 · 1-week engagement",
    description:
      "Exit-intent popup was firing within 2 seconds of page load for some users due to a tracking bug, well before genuine exit intent. Delayed the trigger to a proper 8-second minimum and required actual cursor movement toward the browser chrome.",
    tag: "Case study",
    stats: [
      { label: "Popup complaints", value: "-40%" },
      { label: "Opt-in rate", value: "unchanged" },
    ],
  },
  {
    id: "os3",
    title: "Ferro Outdoor — cart recovery flow",
    meta: "Outdoor gear · scanned Sep 2025 · 3-week engagement",
    description:
      "No cart-recovery mechanism existed beyond a generic abandoned-cart email sent 48 hours later. Paired an on-site cart-recovery popup at exit with a follow-up email at the 24-hour mark instead, catching intent earlier.",
    tag: "Case study",
    stats: [
      { label: "Recovered carts", value: "+11%" },
      { label: "Recovery window", value: "24h → on-exit" },
    ],
  },
  {
    id: "os4",
    title: "Birchgate Pantry — mobile checkout speed",
    meta: "Grocery / subscription · scanned Aug 2025 · 1-week engagement",
    description:
      "Mobile checkout was loading four separate third-party scripts (chat widget, reviews, two analytics tools) synchronously before the payment form could render. Deferred non-critical scripts to load after first paint.",
    tag: "Case study",
    stats: [
      { label: "Mobile LCP", value: "2.8s → 1.5s" },
      { label: "Mobile conversion", value: "+7%" },
    ],
  },
];

export default function OnlineStoreUseCase() {
  const { user } = useAuth();
  const [items, setItems] = useState(seed);
  const [activeItem, setActiveItem] = useState<DummyItem | null>(null);

  function addItem() {
    const id = `os${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id,
        title: "New case study",
        meta: "Add a client / category / date",
        description: "Add a description of what was found and fixed.",
        tag: "Case study",
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
        <h1 className="text-xl font-medium">Online store</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Tracewell for stores: checkout funnel drop-off, cart abandonment, and product-page
          engagement. A few real-shaped examples of what a scan finds below.
        </p>

        {user?.role === "admin" && (
          <button
            onClick={addItem}
            className="mt-4 rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
          >
            + New case study
          </button>
        )}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <ContentCard
              key={item.id}
              item={item}
              onDelete={deleteItem}
              userActionLabel="View case study"
              onView={setActiveItem}
            />
          ))}
        </div>
      </main>
      <ChatWidget />
      <CaseStudyModal item={activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
