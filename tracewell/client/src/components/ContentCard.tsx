import { useState } from "react";
import { useAuth } from "../lib/auth";

export type Stat = { label: string; value: string };

export type DummyItem = {
  id: string;
  title: string;
  meta: string; // byline / category line, e.g. "by Alex · Nov 12, 2025 · 6 min read"
  description: string; // longer, 2-3 sentence body
  tag: string;
  stats: Stat[]; // 1-3 headline stats, e.g. before/after
};

export default function ContentCard({
  item,
  onDelete,
  userActionLabel,
  onView,
}: {
  item: DummyItem;
  onDelete: (id: string) => void;
  userActionLabel: string;
  onView?: (item: DummyItem) => void;
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [confirmed, setConfirmed] = useState(false);

  function handleAction() {
    if (onView) {
      onView(item);
    } else {
      setConfirmed(true);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-neutral-950 p-4">
      <div className="flex items-start justify-between gap-2">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm"
            autoFocus
          />
        ) : (
          <div className="text-sm font-medium leading-snug">{title}</div>
        )}
        <span className="whitespace-nowrap rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-neutral-400">
          {item.tag}
        </span>
      </div>

      <div className="mt-1 text-[11px] text-neutral-500">{item.meta}</div>
      <p className="mt-2 text-xs leading-relaxed text-neutral-400">{item.description}</p>

      {item.stats.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.stats.map((s) => (
            <div key={s.label} className="rounded-md bg-neutral-900 px-2.5 py-1.5">
              <div className="text-[10px] text-neutral-500">{s.label}</div>
              <div className="text-xs font-medium text-neutral-200">{s.value}</div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        {isAdmin ? (
          editing ? (
            <>
              <button
                onClick={() => setEditing(false)}
                className="rounded-md bg-white px-2.5 py-1 text-[11px] font-medium text-black"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setTitle(item.title);
                  setEditing(false);
                }}
                className="rounded-md border border-white/15 px-2.5 py-1 text-[11px]"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="rounded-md border border-white/15 px-2.5 py-1 text-[11px] hover:bg-white/5"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="rounded-md border border-red-500/30 px-2.5 py-1 text-[11px] text-red-400 hover:bg-red-500/10"
              >
                Delete
              </button>
            </>
          )
        ) : confirmed ? (
          <span className="text-[11px] text-neutral-500">Done</span>
        ) : (
          <button
            onClick={handleAction}
            className="rounded-md border border-white/15 px-2.5 py-1 text-[11px] hover:bg-white/5"
          >
            {userActionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
