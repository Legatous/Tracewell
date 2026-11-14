import { useParams, Link, Navigate } from "react-router-dom";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import { products } from "../lib/types";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <Navigate to="/marketplace" replace />;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="rounded-xl bg-[#0c0c0c] p-4 font-mono text-xs leading-relaxed">
              {product.terminalPreview.map((line, i) => (
                <div key={i} style={{ color: line.color }}>
                  {line.line}
                </div>
              ))}
            </div>

            <h1 className="mt-5 text-lg font-medium">{product.name}</h1>
            <div className="mt-1.5 flex items-center gap-2 text-sm text-neutral-400">
              <span className="text-amber-500">{"★".repeat(Math.round(product.rating))}</span>
              <span>
                {product.rating} ({product.reviewCount} reviews)
              </span>
              <span>·</span>
              <span>{product.installs.toLocaleString()} installs</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-300">{product.description}</p>
          </div>

          <div>
            <div className="rounded-xl border border-white/10 p-4">
              <div className="text-2xl font-medium">${product.price}</div>
              <div className="mt-0.5 text-xs text-neutral-500">one-time, lifetime updates</div>
              <button className="mt-4 w-full rounded-md bg-white py-2 text-sm font-medium text-black hover:bg-neutral-500 hover:text-white transition-colors">
                Buy now ↗
              </button>
              <Link
                to={`/dashboard/products/${product.slug}`}
                className="mt-2 block text-center text-xs text-neutral-500 underline underline-offset-2 hover:text-neutral-300"
              >
                View sample dashboard
              </Link>

              <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="text-neutral-200">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last updated</span>
                  <span className="text-neutral-200">{product.lastUpdated}</span>
                </div>
                <div className="flex justify-between">
                  <span>Framework</span>
                  <span className="text-neutral-200">{product.framework}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
