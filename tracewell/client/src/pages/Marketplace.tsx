import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import { products } from "../lib/types";

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-xl font-medium">Marketplace</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Terminal panels, plugins, and templates for your app.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              to={`/marketplace/${p.slug}`}
              className="rounded-xl border border-white/10 bg-neutral-950 overflow-hidden hover:border-white/25 transition-colors"
            >
              <div className="bg-[#0c0c0c] p-3 font-mono text-[11px] leading-relaxed">
                {p.terminalPreview.map((line, i) => (
                  <div key={i} style={{ color: line.color }}>
                    {line.line}
                  </div>
                ))}
              </div>
              <div className="p-3">
                <div className="text-sm font-medium">{p.name}</div>
                <div className="mt-0.5 text-xs text-neutral-500">
                  {p.category} · ${p.price}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
