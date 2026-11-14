import { useState } from "react";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import ContentCard, { type DummyItem } from "../components/ContentCard";
import CaseStudyModal from "../components/CaseStudyModal";
import { useAuth } from "../lib/auth";

const seed: DummyItem[] = [
  {
    id: "lp1",
    title: "Northwind Analytics — signup page rebuild",
    meta: "B2B SaaS · scanned Oct 2025 · 3-week engagement",
    description:
      "Original signup page asked for name, email, company, phone, and role before showing pricing. Tracewell flagged the phone field as the single largest drop-off point, responsible for roughly a third of abandoned signups at that step.",
    tag: "Case study",
    stats: [
      { label: "Fields before", value: "5" },
      { label: "Fields after", value: "2" },
      { label: "Signup rate", value: "+34%" },
    ],
  },
  {
    id: "lp2",
    title: "Marlowe & Finch — hero section rework",
    meta: "Fashion retail · scanned Sep 2025 · 1-week engagement",
    description:
      "A full-bleed autoplay video hero was pushing LCP past 3 seconds on mobile. Swapped to a compressed static hero image with a lazy-loaded video only on desktop, keeping the visual identity while fixing load time.",
    tag: "Case study",
    stats: [
      { label: "LCP mobile", value: "3.1s → 1.6s" },
      { label: "Bounce rate", value: "-12%" },
    ],
  },
  {
    id: "lp3",
    title: "Cedarline Newsletter — capture page test",
    meta: "Media / newsletter · scanned Aug 2025 · A/B test, 2 weeks",
    description:
      "Email capture field was below the fold on mobile, requiring a scroll before the primary action was even visible. Moved the form above the fold and added a one-line subscriber-count social proof statement.",
    tag: "Case study",
    stats: [
      { label: "Capture rate", value: "+18%" },
      { label: "Sample size", value: "14,200 visits" },
    ],
  },
  {
    id: "lp4",
    title: "Insight Summit — webinar registration",
    meta: "Events / B2B · scanned Jul 2025 · 10-day engagement",
    description:
      "Registration page had no urgency signal and a generic 'Register' button. Added a live countdown to the webinar date and changed the CTA copy to reference the specific date, which the scan data suggested as the main friction point.",
    tag: "Case study",
    stats: [
      { label: "Registrations", value: "+22%" },
      { label: "CTA click rate", value: "+9%" },
    ],
  },
];

export default function LandingPageUseCase() {
  const { user } = useAuth();
  const [items, setItems] = useState(seed);
  const [activeItem, setActiveItem] = useState<DummyItem | null>(null);

  function addItem() {
    const id = `lp${Date.now()}`;
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
        <h1 className="text-xl font-medium">Landing page</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Tracewell for landing pages: conversion-focused metrics, scroll depth, and CTA
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
