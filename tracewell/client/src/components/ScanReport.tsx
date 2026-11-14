import { useEffect, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { demoScan, type Callout, type ScanResult, type Severity } from "../lib/scanDemo";

const COLORS: Record<Severity, string> = {
  warn: "#e8c76a",
  good: "#3ddc84",
};

/* ---------- Draggable + resizable panel (mouse and touch via Pointer Events) ---------- */

type Transform = { x: number; y: number; s: number };

function DragPanel({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const [t, setT] = useState<Transform>({ x: 0, y: 0, s: 1 });

  function startDrag(e: PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    const sx = e.clientX;
    const sy = e.clientY;
    const ox = t.x;
    const oy = t.y;

    const move = (ev: globalThis.PointerEvent) =>
      setT((p) => ({ ...p, x: ox + ev.clientX - sx, y: oy + ev.clientY - sy }));
    const up = () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
  }

  function startResize(e: PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    const sx = e.clientX;
    const os = t.s;

    const move = (ev: globalThis.PointerEvent) => {
      const next = Math.min(1.6, Math.max(0.55, os + (ev.clientX - sx) / 160));
      setT((p) => ({ ...p, s: next }));
    };
    const up = () => {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
  }

  return (
    <div
      className={`absolute left-0 top-0 touch-none rounded-xl border border-white/10 bg-black p-3 ${className}`}
      style={{
        ...style,
        transformOrigin: "top left",
        transform: `translate(${t.x}px, ${t.y}px) scale(${t.s})`,
      }}
    >
      <div
        onPointerDown={startDrag}
        className="mb-2 flex cursor-grab touch-none select-none items-center gap-1 border-b border-dashed border-white/10 pb-1.5 text-[9px] text-neutral-500 active:cursor-grabbing"
      >
        ⠇⠇ drag me · pull the corner to resize
      </div>
      {children}
      <div
        onPointerDown={startResize}
        aria-label="Resize"
        className="absolute -bottom-2 -right-2 z-10 flex h-5 w-5 cursor-nwse-resize touch-none items-center justify-center rounded-full border-2 border-black bg-white text-[10px] text-black"
      >
        ⤡
      </div>
    </div>
  );
}

/* ---------- Static pieces ---------- */

function ScoreRing({ score, ready }: { score: number; ready: boolean }) {
  const r = 24;
  const c = 2 * Math.PI * r;
  const dash = ready ? (score / 100) * c : 0;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={COLORS.warn}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          style={{ transition: "stroke-dasharray 0.7s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">{score}</div>
    </div>
  );
}

function SiteMock() {
  return (
    <div className="overflow-hidden rounded-lg bg-white text-[9px] text-neutral-900">
      <div className="flex items-center justify-between border-b border-neutral-200 px-2.5 py-2 text-[10px] font-semibold">
        <span>IRONFORGE</span>
        <span>Cart (0)</span>
      </div>
      <div className="bg-gradient-to-r from-[#2b2f36] to-[#454c57] px-2.5 py-3.5 text-white">
        <div className="text-xs font-bold">Winter tool sale</div>
        <div className="mt-0.5 text-[8px] text-neutral-300">Up to 30% off power tools</div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 p-2">
        <div className="rounded border border-neutral-200 p-1.5">
          <div className="mb-1 h-7 rounded-sm bg-neutral-100" />
          <div className="text-[8px] font-semibold">Cordless drill</div>
          <div className="mt-0.5 text-[8px] text-neutral-500">$89.00</div>
          <div className="mt-1 rounded-sm bg-neutral-900 py-0.5 text-center text-[7.5px] font-semibold text-white">
            Buy now
          </div>
        </div>
        <div className="rounded border border-neutral-200 p-1.5">
          <div className="mb-1 h-7 rounded-sm bg-neutral-100" />
          <div className="text-[8px] font-semibold">Angle grinder</div>
          <div className="mt-0.5 text-[8px] text-neutral-500">$64.00</div>
          <div className="mt-1 text-[7px] text-blue-600 underline">View specs (1.2MB)</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-[8px]">
        <span>🔒 Trade pricing</span>
        <span>Sign in</span>
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

export default function ScanReport({ result = demoScan }: { result?: ScanResult }) {
  const [ready, setReady] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Two frames so the CSS transitions (bars, ring, slider) play from 0.
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  const active: Callout | undefined = result.callouts.find((c) => c.id === activeId);

  return (
    <div className="mx-auto max-w-[400px] rounded-xl border border-white/10 bg-neutral-950 p-4 text-left">
      <div className="relative h-[560px]">
        {/* Stats panel */}
        <DragPanel className="w-[230px]">
          <div className="flex items-center gap-3 anim-pop">
            <ScoreRing score={result.score} ready={ready} />
            <div>
              <div className="text-xs font-medium">{result.scoreTitle}</div>
              <div className="mt-0.5 text-[10px] text-neutral-500">{result.scoreSub}</div>
            </div>
          </div>

          <div className="mt-3.5 flex gap-2 anim-fly-top" style={{ animationDelay: "0.1s" }}>
            {result.metrics.map((m) => (
              <div key={m.label} className="flex-1 rounded-lg bg-neutral-900 px-2.5 py-2">
                <div className="flex items-center gap-1 text-[9px] text-neutral-500">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: COLORS[m.severity] }}
                  />
                  {m.label}
                </div>
                <div className="mt-1 text-[11px] font-medium">{m.value}</div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-sm bg-white/10">
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: ready ? `${m.pct}%` : "0%",
                      background: COLORS[m.severity],
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DragPanel>

        {/* Site panel */}
        <DragPanel className="w-[312px] pb-5" style={{ top: 190 }}>
          <div className="relative mx-auto h-[200px] w-[288px]">
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              viewBox="0 0 288 200"
              preserveAspectRatio="none"
            >
              {result.callouts.map((c) => (
                <line
                  key={c.id}
                  className="anim-fade"
                  style={{ animationDelay: `${c.delay - 0.05}s` }}
                  x1={c.line.x1}
                  y1={c.line.y1}
                  x2={c.line.x2}
                  y2={c.line.y2}
                  stroke={COLORS[c.severity]}
                  strokeOpacity="0.65"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              ))}
            </svg>

            <div className="anim-pop absolute left-[54px] top-0 w-[180px]" style={{ animationDelay: "0.25s" }}>
              <SiteMock />
            </div>

            {result.callouts.map((c) => {
              const selected = c.id === activeId;
              return (
                <div key={c.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-label={c.tip.title}
                    onClick={() => setActiveId(c.id)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveId(c.id)}
                    className="anim-dot absolute z-[4] h-2 w-2 cursor-pointer rounded-full border-2 border-black"
                    style={{
                      left: c.dot.x,
                      top: c.dot.y,
                      background: COLORS[c.severity],
                      animationDelay: `${c.delay}s`,
                      boxShadow: selected ? `0 0 0 3px #fff` : undefined,
                    }}
                  />
                  <div
                    className="anim-dot absolute z-[3] whitespace-nowrap rounded-[5px] border border-white/20 bg-black px-[7px] py-[3px] text-[8.5px] font-medium"
                    style={{
                      left: c.labelAt.x,
                      top: c.labelAt.y,
                      color: COLORS[c.severity],
                      animationDelay: `${c.delay}s`,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    className={`absolute z-[5] rounded-full border bg-black px-2 py-[3px] text-[9px] font-medium opacity-0 anim-fly-${c.chipFrom}`}
                    style={{
                      left: c.chipAt.x,
                      top: c.chipAt.y,
                      color: COLORS[c.severity],
                      borderColor: `${COLORS[c.severity]}66`,
                      animationDelay: `${c.delay + 0.05}s`,
                    }}
                  >
                    {c.chip}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tip box */}
          <div className="mt-3.5 flex items-start gap-2.5 rounded-[10px] border border-white/10 bg-neutral-900 px-3 py-2.5">
            {active ? (
              <>
                <div className="text-base leading-none">{active.tip.icon}</div>
                <div>
                  <div className="text-[11px] font-medium text-white">{active.tip.title}</div>
                  <div className="mt-0.5 text-[10.5px] leading-normal text-neutral-400">{active.tip.body}</div>
                </div>
              </>
            ) : (
              <span className="text-[10.5px] text-neutral-500">👆 Tap a glowing dot above to see what it means</span>
            )}
          </div>

          {/* Clickability scale */}
          <div className="mt-4 border-t border-dashed border-white/10 pt-3">
            <div className="flex justify-between text-[10.5px] text-neutral-400">
              <span>Overall clickability</span>
              <strong className="font-medium text-white">{result.clickability}%</strong>
            </div>
            <div className="mt-0.5 text-[9px] text-neutral-600">{result.clickabilitySub}</div>
            <div
              className="relative mt-2.5 h-1.5 rounded-sm"
              style={{ background: "linear-gradient(90deg, #e24b4a 0%, #e8c76a 50%, #3ddc84 100%)" }}
            >
              <div
                className="absolute right-0 top-0 h-full rounded-r-sm bg-black/60"
                style={{ width: ready ? `${100 - result.clickability}%` : "100%", transition: "width 0.7s ease" }}
              />
              <div
                className="absolute top-1/2 h-[13px] w-[13px] rounded-full border-2 border-black bg-white"
                style={{
                  left: ready ? `${result.clickability}%` : "0%",
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.7s ease",
                }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[8.5px] text-neutral-600">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </DragPanel>
      </div>
    </div>
  );
}
