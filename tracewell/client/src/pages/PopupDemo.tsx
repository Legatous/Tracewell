import { useState } from "react";
import Header from "../components/Header";
import PopupBanner from "../components/popups/PopupBanner";
import PopupModal from "../components/popups/PopupModal";
import PopupSlideIn from "../components/popups/PopupSlideIn";
import DraggablePopupPreview from "../components/popups/DraggablePopupPreview";

type Variant = "none" | "banner" | "modal" | "slideIn";

export default function PopupDemo() {
  const [variant, setVariant] = useState<Variant>("none");
  const [key, setKey] = useState(0);

  function trigger(v: Variant) {
    setVariant(v);
    setKey((k) => k + 1);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {variant === "banner" && <PopupBanner key={key} />}
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-lg font-medium">Popup demo — sample store</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Trigger each variant to see how it actually behaves, not just how it looks.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => trigger("banner")}
            className="rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
          >
            Trigger top banner
          </button>
          <button
            onClick={() => trigger("modal")}
            className="rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
          >
            Trigger center modal
          </button>
          <button
            onClick={() => trigger("slideIn")}
            className="rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"
          >
            Trigger slide-in
          </button>
          <button
            onClick={() => trigger("none")}
            className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-neutral-500 hover:bg-white/5"
          >
            Reset
          </button>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <h2 className="text-sm font-medium mb-1">Try the recommended placement yourself</h2>
          <DraggablePopupPreview />
        </div>

        <div className="mt-10 rounded-xl border border-white/10 p-6 text-center">
          <div className="text-lg font-medium">Autumn Collection</div>
          <div className="mt-1 text-xs text-neutral-500">New arrivals, made to last.</div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="h-20 rounded-lg bg-neutral-900" />
            <div className="h-20 rounded-lg bg-neutral-900" />
            <div className="h-20 rounded-lg bg-neutral-900" />
          </div>
        </div>
      </main>

      {variant === "modal" && <PopupModal key={key} onClose={() => setVariant("none")} />}
      {variant === "slideIn" && <PopupSlideIn key={key} onClose={() => setVariant("none")} />}
    </div>
  );
}
