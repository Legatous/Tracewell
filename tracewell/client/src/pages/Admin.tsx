import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import { useAuth } from "../lib/auth";

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    setChecked(true);
  }, [user, loading, navigate]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="mx-auto max-w-3xl px-6 py-16 text-sm text-neutral-500">
          Checking access…
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="text-xs text-neutral-500">Signed in as {user?.name} (admin)</div>
        <h1 className="mt-1 text-lg font-medium">Admin — content</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Add or edit blog posts, marketplace products, and templates. UI only for now — not
          wired to a real database yet.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-white/10 p-4">
            <div className="text-sm font-medium">Blog posts</div>
            <div className="mt-1 text-xs text-neutral-500">3 drafts, 2 published</div>
            <button className="mt-3 w-full rounded-md border border-white/15 py-1.5 text-xs hover:bg-white/5">
              + New post
            </button>
          </div>
          <div className="rounded-md border border-white/10 p-4">
            <div className="text-sm font-medium">Marketplace products</div>
            <div className="mt-1 text-xs text-neutral-500">3 live products</div>
            <button className="mt-3 w-full rounded-md border border-white/15 py-1.5 text-xs hover:bg-white/5">
              + New product
            </button>
          </div>
          <div className="rounded-md border border-white/10 p-4">
            <div className="text-sm font-medium">Templates</div>
            <div className="mt-1 text-xs text-neutral-500">0 live templates</div>
            <button className="mt-3 w-full rounded-md border border-white/15 py-1.5 text-xs hover:bg-white/5">
              + New template
            </button>
          </div>
        </div>
      </main>
      <ChatWidget />
    </div>
  );
}
