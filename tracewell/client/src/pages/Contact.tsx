import { useState } from "react";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Demo only — no backend call yet. Swap this for a real POST to
    // your server (e.g. server/index.js) when you're ready to wire it up.
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-md px-6 py-16">
        <h1 className="text-xl font-medium">Contact</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Questions, feedback, or want something custom? Send us a note.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-md border border-white/10 bg-neutral-950 p-4 text-sm text-neutral-300">
            Thanks, {name || "there"} — we got your message and will reply to {email} soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs text-neutral-400">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs text-neutral-400">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs text-neutral-400">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you building?"
                rows={5}
                required
              />
            </div>

            <button type="submit" className="btn-submit mt-2 self-start">
              Send message
            </button>
          </form>
        )}
      </main>
      <ChatWidget />
    </div>
  );
}
