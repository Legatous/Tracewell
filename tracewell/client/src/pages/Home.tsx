import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import ScanReport from "../components/ScanReport";

export default function Home() {
  const [mode, setMode] = useState<"url" | "upload">("url");
  const [url, setUrl] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [scanId, setScanId] = useState(0);

  function handleScan() {
    if (mode === "url" && !url.trim()) return;
    setShowResult(true);
    setScanId((n) => n + 1); // remount so the reveal animation replays on every scan
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-3xl font-medium leading-tight md:text-4xl">
          Point it at your app. Get a diagnosis, not a chart.
        </h1>
        <p className="mt-3 text-sm text-neutral-400">
          Paste a live URL, or upload your project files.
        </p>

        <div className="mt-8 flex justify-center gap-1 text-sm">
          <button
            onClick={() => setMode("url")}
            className={`border-b-2 px-3 py-1.5 transition-colors ${
              mode === "url" ? "border-white text-white" : "border-transparent text-neutral-400"
            }`}
          >
            URL
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`border-b-2 px-3 py-1.5 transition-colors ${
              mode === "upload" ? "border-white text-white" : "border-transparent text-neutral-400"
            }`}
          >
            Upload files
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          {mode === "url" ? (
            <div className="flex w-full max-w-md gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="ironforge-tools.com"
                className="flex-1"
              />
              <button
                onClick={handleScan}
                className="whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-500 hover:text-white transition-colors"
              >
                Run scan ↗
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed border-white/20 px-4 py-6 text-sm text-neutral-400 hover:border-white/40 transition-colors">
                Drop a .zip of your project here, or click to browse
                <input type="file" accept=".zip" className="hidden" onChange={handleScan} />
              </label>
            </div>
          )}
        </div>

        <div className="mt-8">
          {showResult ? (
            <ScanReport key={scanId} />
          ) : (
            <p className="text-xs text-neutral-600">Results appear here once a scan runs.</p>
          )}
        </div>
      </main>

      <div className="mx-auto max-w-3xl px-6 pb-6 text-center text-xs text-neutral-600">
        Need something custom instead?{" "}
        <Link to="/custom" className="text-neutral-300 underline underline-offset-2 hover:text-white transition-colors">
          Tell us what you're building
        </Link>
      </div>

      <div className="flex justify-center pb-10">
        <a
          href="#how-it-works"
          aria-label="Scroll to how it works"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-400 hover:border-white/40 hover:text-white transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </div>

      <section id="how-it-works" className="border-t border-white/10 px-6 py-16">
        <div className="mx-auto grid max-w-3xl gap-8 text-center sm:grid-cols-3">
          <div>
            <div className="text-sm font-medium">1. Install</div>
            <p className="mt-1 text-xs text-neutral-500">Paste a URL or drop your project files.</p>
          </div>
          <div>
            <div className="text-sm font-medium">2. See real data</div>
            <p className="mt-1 text-xs text-neutral-500">
              Performance, funnels, and errors, straight from your app.
            </p>
          </div>
          <div>
            <div className="text-sm font-medium">3. Get prioritized fixes</div>
            <p className="mt-1 text-xs text-neutral-500">
              AI suggestions linked to the exact marketplace tool that fixes it.
            </p>
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  );
}
