import { useState } from "react";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";

export default function Custom() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to backend API + email notification
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-xl font-medium">Need something custom built?</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Tell me what you're working on. I reply within 1 business day, by email.
        </p>

        {sent ? (
          <div className="mt-8 rounded-md border border-white/10 p-4 text-sm text-neutral-300">
            Got it — I'll reply by email within 1 business day.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs text-neutral-400">Your email</label>
              <input type="email" required placeholder="name@company.com" className="w-full" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-neutral-400">Project or repo link</label>
              <input type="text" placeholder="yourapp.com or github.com/you/project" className="w-full" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-neutral-400">What do you need?</label>
              <textarea
                rows={4}
                placeholder="A short description is enough, we can work out the details by email."
                className="w-full resize-y"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-white py-2 text-sm font-medium text-black hover:bg-neutral-500 hover:text-white transition-colors"
            >
              Send message ↗
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-neutral-600">
          No calls needed, everything is handled over email and chat.
        </p>
      </main>
      <ChatWidget />
    </div>
  );
}
