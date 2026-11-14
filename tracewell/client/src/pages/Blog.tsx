import { useState } from "react";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import ContentCard, { type DummyItem } from "../components/ContentCard";
import { useAuth } from "../lib/auth";

const seed: DummyItem[] = [
  {
    id: "bl1",
    title: "Building an analytics SDK from scratch",
    meta: "by Alex · Jun 14, 2025 · 6 min read",
    description:
      "Walks through the event batching logic behind the SDK: why navigator.sendBeacon beats a plain fetch call for analytics specifically, how events queue client-side before flushing, and what broke during early testing on Safari.",
    tag: "Build log",
    stats: [
      { label: "Category", value: "Engineering" },
      { label: "Comments", value: "8" },
    ],
  },
  {
    id: "bl2",
    title: "Turning raw events into a real-time dashboard",
    meta: "by Alex · Jun 28, 2025 · 4 min read",
    description:
      "Covers the dashboard build: why Recharts was picked over a heavier charting library, how the vitals chart aggregates minute-level data into weekly trends, and the query pattern used to keep it fast at scale.",
    tag: "Build log",
    stats: [
      { label: "Category", value: "Engineering" },
      { label: "Comments", value: "3" },
    ],
  },
  {
    id: "bl3",
    title: "I fed our own analytics data to an LLM",
    meta: "by Alex · Jul 19, 2025 · 7 min read",
    description:
      "The AI growth-suggestions pipeline, explained end to end: how raw events get aggregated into a structured summary before being sent to Claude, why the matching between detected issues and marketplace products is a rules table rather than left to the model, and what it costs to run per scan.",
    tag: "Build log",
    stats: [
      { label: "Category", value: "AI / product" },
      { label: "Comments", value: "14" },
    ],
  },
  {
    id: "bl4",
    title: "Real popup conversion benchmarks for 2026",
    meta: "by Alex · Aug 2, 2025 · 5 min read",
    description:
      "A look at what SuperPopups and OptiMonk's published data actually says about popup performance by type, and why position and size on the page aren't things any public benchmark study currently measures.",
    tag: "Sector notes",
    stats: [
      { label: "Category", value: "Research" },
      { label: "Comments", value: "21" },
    ],
  },
];

export default function Blog() {
  const { user } = useAuth();
  const [items, setItems] = useState(seed);

  function addItem() {
    const id = `bl${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id,
        title: "New post",
        meta: "by you · draft · — min read",
        description: "Add a description or excerpt.",
        tag: "Build log",
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
        <h1 className="text-xl font-medium">Blog</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Build logs and sector notes, documenting Tracewell as it's built.
        </p>

        {user?.role === "admin" && (
          <button
            onClick={addItem}
            className="mt-4 rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
          >
            + New post
          </button>
        )}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <ContentCard key={item.id} item={item} onDelete={deleteItem} userActionLabel="Read" />
          ))}
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
