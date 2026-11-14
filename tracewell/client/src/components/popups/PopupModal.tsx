import { useState } from "react";

export default function PopupModal({ onClose }: { onClose?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function close() {
    setVisible(false);
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-72 rounded-xl border border-white/10 bg-neutral-900 p-5 text-center shadow-2xl">
        <button
          aria-label="Close"
          onClick={close}
          className="float-right -mt-1 -mr-1 text-neutral-500 hover:text-white"
        >
          ✕
        </button>
        {submitted ? (
          <div className="pt-6 text-sm text-neutral-200">Check your email for the code.</div>
        ) : (
          <>
            <div className="text-sm font-medium">Welcome — 15% off</div>
            <div className="mt-1 text-xs text-neutral-400">First order only, code sent by email.</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="mt-3 w-full rounded-md border border-white/15 bg-transparent px-2.5 py-1.5 text-xs placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
            />
            <button
              onClick={() => email.trim() && setSubmitted(true)}
              className="mt-2 w-full rounded-md bg-white py-1.5 text-xs font-medium text-black hover:bg-neutral-500 hover:text-white transition-colors"
            >
              Claim discount
            </button>
          </>
        )}
      </div>
    </div>
  );
}
