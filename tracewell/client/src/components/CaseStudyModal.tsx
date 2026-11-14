import type { DummyItem } from "./ContentCard";

export default function CaseStudyModal({
  item,
  onClose,
}: {
  item: DummyItem | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* browser-style mockup header */}
        <div className="border-b border-white/10 bg-neutral-950 p-6">
          <div className="rounded-md border border-white/10 bg-white p-6 text-black">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold">{item.title.split("—")[0].trim()}</span>
              <span className="rounded bg-black px-3 py-1 text-xs font-medium text-white">
                Contact Us
              </span>
            </div>
            <h3 className="text-xl font-bold">Lorem ipsum dolor sit amet</h3>
            <p className="mt-1 text-sm text-neutral-500">
              Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-1 text-xs text-neutral-500">{item.meta}</p>
            </div>
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
              ✕
            </button>
          </div>

          {item.stats.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {item.stats.map((s) => (
                <div key={s.label} className="rounded-md border border-white/10 px-3 py-2">
                  <div className="text-[10px] text-neutral-500">{s.label}</div>
                  <div className="text-sm font-medium text-white">{s.value}</div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4 text-sm text-neutral-300">
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                What we found
              </h3>
              <p>{item.description}</p>
            </div>
            <div>
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                Lorem ipsum
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
