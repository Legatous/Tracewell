import { useEffect } from "react";

// Replace these with your real Tawk.to Property ID and Widget ID,
// found in your Tawk.to dashboard under Administration > Channels > Chat Widget.
// The embed snippet there looks like:
// https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
const TAWK_PROPERTY_ID = "REPLACE_WITH_PROPERTY_ID";
const TAWK_WIDGET_ID = "REPLACE_WITH_WIDGET_ID";

export default function ChatWidget() {
  useEffect(() => {
    // Avoid injecting the script twice if this component re-mounts
    // (e.g. React StrictMode in dev, or route changes).
    if (document.getElementById("tawk-to-script")) return;

    const script = document.createElement("script");
    script.id = "tawk-to-script";
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      // Tawk.to doesn't offer a clean unmount API; leaving the script and
      // bubble in place across route changes is expected behavior.
    };
  }, []);

  // Tawk.to injects its own chat bubble once the script loads, so this
  // component doesn't render anything itself.
  return null;
}
