import { useState } from "react";

export default function PopupBanner({
  message = "Free shipping on orders over $50",
}: {
  message?: string;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center gap-3 bg-white px-4 py-2 text-xs font-medium text-black">
      <span>{message}</span>
      <button
        aria-label="Dismiss"
        onClick={() => setVisible(false)}
        className="text-black/60 hover:text-black"
      >
        ✕
      </button>
    </div>
  );
}
