import { useState, useEffect } from "react";

export default function PopupSlideIn({
  delayMs = 0,
  onClose,
}: {
  delayMs?: number;
  onClose?: () => void;
}) {
  const [show, setShow] = useState(delayMs === 0);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (delayMs === 0) return;
    const t = setTimeout(() => setShow(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  function close() {
    setShow(false);
    onClose?.();
  }

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 w-56 rounded-lg border border-white/10 bg-neutral-900 p-3.5 shadow-2xl transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <button
        aria-label="Close"
        onClick={close}
        className="float-right -mt-0.5 -mr-0.5 text-xs text-neutral-500 hover:text-white"
      >
        ✕
      </button>
      {submitted ? (
        <div className="pt-3 text-xs text-neutral-200">Code sent, check your inbox.</div>
      ) : (
        <>
          <div className="text-xs font-medium">Get 10% off</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-2 w-full rounded-md border border-white/15 bg-transparent px-2 py-1 text-[11px] placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
          />
          <button
            onClick={() => email.trim() && setSubmitted(true)}
            className="mt-1.5 w-full rounded-md bg-white py-1 text-[11px] font-medium text-black hover:bg-neutral-500 hover:text-white transition-colors"
          >
            Send code
          </button>
        </>
      )}
    </div>
  );
}
