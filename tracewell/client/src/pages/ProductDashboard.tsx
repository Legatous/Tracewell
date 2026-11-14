import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import { products } from "../lib/types";

const sampleReviews = [
  { user: "devkarim", rating: 5, text: "Conversion jumped after I switched to the slide-in variant." },
  { user: "n_sato", rating: 4, text: "Good defaults, wish there was a way to A/B test copy." },
];

export default function ProductDashboard() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const [reaction, setReaction] = useState<"like" | "dislike" | null>(null);
  const [likes, setLikes] = useState(96);
  const [dislikes, setDislikes] = useState(4);
  const [helpSent, setHelpSent] = useState(false);

  if (!product) return <Navigate to="/marketplace" replace />;

  function react(next: "like" | "dislike") {
    if (reaction === next) return;
    if (next === "like") {
      setLikes((n) => n + 1);
      if (reaction === "dislike") setDislikes((n) => n - 1);
    } else {
      setDislikes((n) => n + 1);
      if (reaction === "like") setLikes((n) => n - 1);
    }
    setReaction(next);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-500">Installed tool</div>
            <div className="text-lg font-medium">{product.name}</div>
          </div>
          <button
            onClick={() => setHelpSent(false)}
            className="flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5 transition-colors"
          >
            Contact support
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-md bg-neutral-950 p-3.5">
            <div className="text-xs text-neutral-500">Popup opens</div>
            <div className="mt-0.5 text-xl font-medium">1,204</div>
          </div>
          <div className="rounded-md bg-neutral-950 p-3.5">
            <div className="text-xs text-neutral-500">Conversion rate</div>
            <div className="mt-0.5 text-xl font-medium">11.8%</div>
          </div>
          <div className="rounded-md bg-neutral-950 p-3.5">
            <div className="text-xs text-neutral-500">Emails captured</div>
            <div className="mt-0.5 text-xl font-medium">142</div>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-[#0c0c0c] p-4 font-mono text-xs leading-relaxed">
          <div className="text-neutral-500">growth ideas</div>
          <div className="text-emerald-400">! delay trigger by 5s, closes are happening too fast</div>
          <div className="text-emerald-400">+ try slide-in instead of modal on product pages</div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-md border border-white/15 px-4 py-3">
          <span className="text-sm text-neutral-300">
            Something not working right, or want help tuning this?
          </span>
          {helpSent ? (
            <span className="text-xs text-neutral-500">Request sent</span>
          ) : (
            <button
              onClick={() => setHelpSent(true)}
              className="whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-neutral-500 hover:text-white transition-colors"
            >
              Request help ↗
            </button>
          )}
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={() => react("like")}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors ${
              reaction === "like" ? "border-white bg-white/10" : "border-white/15"
            }`}
          >
            👍 {likes}
          </button>
          <button
            onClick={() => react("dislike")}
            className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs transition-colors ${
              reaction === "dislike" ? "border-white bg-white/10" : "border-white/15"
            }`}
          >
            👎 {dislikes}
          </button>
          <span className="ml-1 text-xs text-neutral-600">based on installs who reacted</span>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="text-sm font-medium">Reviews</div>
          <div className="mt-2 space-y-3">
            {sampleReviews.map((r) => (
              <div key={r.user}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{r.user}</span>
                  <span className="text-amber-500">{"★".repeat(r.rating)}</span>
                </div>
                <div className="text-xs text-neutral-400">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
