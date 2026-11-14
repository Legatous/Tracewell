import { useRef, useState, useCallback, useEffect } from "react";

const STAGE_W = 600;
const STAGE_H = 340;
const MIN_SIZE = 150;
const MAX_SIZE = 320;

type PopupType = "coupon" | "cart" | "stock";

// Base rates anchored to real 2026 benchmark midpoints (SuperPopups, OptiMonk).
// Position/size adjustment on top of these is a design heuristic, not sourced research —
// no public study ties exact on-page position or size to conversion rate.
const BASE_RATES: Record<PopupType, number> = {
  coupon: 6.5, // welcome discount popups average 5-8%
  cart: 12.5, // cart recovery popups average 8-17%, top performers 20-35%
  stock: 6.5, // back-in-stock treated as high-intent lead capture, ~5-8%
};

const TYPE_LABELS: Record<PopupType, string> = {
  coupon: "Welcome discount",
  cart: "Cart recovery",
  stock: "Back in stock",
};

function PopupContent({ type }: { type: PopupType }) {
  if (type === "coupon") {
    return (
      <div>
        <div className="text-xs font-semibold text-neutral-900">Get 10% off</div>
        <div className="mt-0.5 text-[11px] text-neutral-500">code: WELCOME10</div>
        <button className="mt-2 w-full rounded-lg bg-pink-500 py-1.5 text-[11px] font-medium text-white">
          Apply code
        </button>
      </div>
    );
  }
  if (type === "cart") {
    return (
      <div>
        <div className="text-xs font-semibold text-neutral-900">Still thinking it over?</div>
        <div className="mt-0.5 text-[11px] text-neutral-500">
          Your cart is saved, plus 5% off if you check out now.
        </div>
        <button className="mt-2 w-full rounded-lg bg-neutral-900 py-1.5 text-[11px] font-medium text-white">
          Return to cart
        </button>
      </div>
    );
  }
  return (
    <div>
      <div className="text-xs font-semibold text-neutral-900">Notify me when back in stock</div>
      <input
        placeholder="you@email.com"
        className="mt-2 w-full rounded-md border border-neutral-300 px-2 py-1 text-[11px] placeholder:text-neutral-400"
      />
      <button className="mt-1.5 w-full rounded-lg bg-violet-500 py-1.5 text-[11px] font-medium text-white">
        Notify me
      </button>
    </div>
  );
}

export default function DraggablePopupPreview() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [type, setType] = useState<PopupType>("coupon");
  const [pos, setPos] = useState({ x: STAGE_W - 216, y: STAGE_H - 130 });
  const [size, setSize] = useState(200);
  const [fitLevel, setFitLevel] = useState(50);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [transitionOn, setTransitionOn] = useState(false);

  const popupHeight = size * 0.6;

  const computeFromPositionAndSize = useCallback(
    (x: number, y: number, s: number) => {
      const centerX = STAGE_W / 2;
      const centerY = STAGE_H / 2;
      const popupCenterX = x + s / 2;
      const popupCenterY = y + (s * 0.6) / 2;
      const distFromCenter = Math.hypot(popupCenterX - centerX, popupCenterY - centerY);
      const maxDist = Math.hypot(centerX, centerY);
      const centerness = 1 - Math.min(distFromCenter / maxDist, 1);
      const sizeFactor = (s - MIN_SIZE) / (MAX_SIZE - MIN_SIZE);
      const adjust = (centerness - 0.5) * 4 - sizeFactor * 1.5;
      const rate = Math.max(2, BASE_RATES[type] + adjust);
      const intrusivenessScore = centerness * 0.6 + sizeFactor * 0.4;
      return { centerness, sizeFactor, rate, intrusivenessScore };
    },
    [type]
  );

  const { rate, intrusivenessScore } = computeFromPositionAndSize(pos.x, pos.y, size);
  const intrusiveness =
    intrusivenessScore > 0.66 ? "High" : intrusivenessScore > 0.33 ? "Medium" : "Low";

  useEffect(() => {
    const { centerness } = computeFromPositionAndSize(pos.x, pos.y, size);
    setFitLevel(Math.round(centerness * 100));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos.x, pos.y, size, type]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setTransitionOn(false);
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || !stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    let x = e.clientX - stageRect.left - dragOffset.current.x;
    let y = e.clientY - stageRect.top - dragOffset.current.y;
    x = Math.max(0, Math.min(x, STAGE_W - size));
    y = Math.max(0, Math.min(y, STAGE_H - popupHeight));
    setPos({ x, y });
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setDragging(false);
    setTransitionOn(true);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }

  function onSizeChange(newSize: number) {
    setTransitionOn(false);
    setSize(newSize);
  }

  function applyFitLevel(t: number) {
    setFitLevel(Math.round(t * 100));
    setTransitionOn(true);
    const newSize = MIN_SIZE + t * (MAX_SIZE - MIN_SIZE);
    const popupH = newSize * 0.6;
    const centerX = STAGE_W / 2;
    const centerY = STAGE_H / 2;
    const cornerX = STAGE_W - newSize / 2 - 16;
    const cornerY = STAGE_H - popupH / 2 - 16;
    const px = cornerX + (centerX - cornerX) * t;
    const py = cornerY + (centerY - cornerY) * t;
    setSize(newSize);
    setPos({ x: px - newSize / 2, y: py - popupH / 2 });
  }

  return (
    <div>
      <div className="mb-2.5 flex gap-1.5">
        {(Object.keys(TYPE_LABELS) as PopupType[]).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-md border px-3 py-1 text-xs transition-colors ${
              type === t ? "border-white/30 bg-white/10" : "border-white/15 text-neutral-400"
            }`}
          >
            {TYPE_LABELS[t]}
          </button>
        ))}
      </div>

      <div
        ref={stageRef}
        style={{ height: STAGE_H }}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2.5">
          <div className="text-sm font-semibold text-neutral-900">yourstore.com</div>
          <div className="flex gap-3.5 text-xs text-neutral-500">
            <span>Shop</span>
            <span>New</span>
            <span>Cart</span>
          </div>
        </div>

        <div
          className="px-5 py-5 text-center"
          style={{ background: "linear-gradient(135deg,#ff9a6c,#ff5e8f 55%,#7b5eff)" }}
        >
          <div className="text-base font-semibold text-white">Autumn Collection</div>
          <p className="mx-auto mt-1 max-w-xs text-[11px] leading-relaxed text-white/90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="p-4">
          <div className="mx-auto grid max-w-md grid-cols-3 gap-2.5">
            <div className="h-14 rounded-lg" style={{ background: "#ffd6a5" }} />
            <div className="h-14 rounded-lg" style={{ background: "#a5d8ff" }} />
            <div className="h-14 rounded-lg" style={{ background: "#d0bfff" }} />
          </div>
        </div>

        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            left: pos.x,
            top: pos.y,
            width: size,
            cursor: dragging ? "grabbing" : "grab",
            transition: transitionOn ? "left 0.2s ease, top 0.2s ease, width 0.2s ease" : "none",
          }}
          className="absolute select-none rounded-lg border border-neutral-200 bg-white p-3 shadow-lg"
        >
          <PopupContent type={type} />
        </div>
      </div>

      <div className="mt-3.5 flex items-center gap-2.5">
        <label className="min-w-[70px] text-xs text-neutral-400">Size</label>
        <input
          type="range"
          min={MIN_SIZE}
          max={MAX_SIZE}
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
          className="flex-1"
        />
      </div>

      <div className="mt-2.5 flex items-center gap-2.5">
        <label className="min-w-[70px] text-xs text-neutral-400">Fit toward</label>
        <span className="text-[11px] text-neutral-500">Min</span>
        <input
          type="range"
          min={0}
          max={100}
          value={fitLevel}
          onChange={(e) => applyFitLevel(Number(e.target.value) / 100)}
          className="flex-1"
        />
        <span className="text-[11px] text-neutral-500">Max</span>
      </div>

      <div className="mt-3.5 grid grid-cols-2 gap-3">
        <div className="rounded-md bg-neutral-950 p-3">
          <div className="text-xs text-neutral-500">Estimated conversion</div>
          <div className="mt-0.5 text-lg font-medium">{Math.round(rate * 10) / 10}%</div>
        </div>
        <div className="rounded-md bg-neutral-950 p-3">
          <div className="text-xs text-neutral-500">Intrusiveness</div>
          <div className="mt-0.5 text-lg font-medium">{intrusiveness}</div>
        </div>
      </div>

      <div className="mt-3 rounded-md bg-neutral-900 p-3 text-[11px] leading-relaxed text-neutral-400">
        <span className="text-neutral-200 font-medium">Base rates from 2026 benchmarks:</span>{" "}
        welcome discount popups average 5–8% (SuperPopups), cart recovery popups average
        8–17% with top performers reaching 20–35% (OptiMonk), back-in-stock alerts are
        treated as high-intent lead capture at ~5–8%.
        <br />
        <span className="text-neutral-200 font-medium">Not benchmarked:</span> the exact effect
        of drag position and size is a design heuristic, not sourced research.
      </div>
    </div>
  );
}
