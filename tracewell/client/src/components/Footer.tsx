import { Link } from "react-router-dom";

const links = [
  { label: "Terms of service", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 px-6 py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2">
        <nav className="flex flex-wrap justify-center gap-5 text-xs">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="text-link">
              {link.label}
            </Link>
          ))}
        </nav>
        <span className="text-xs text-neutral-600">© {new Date().getFullYear()} Tracewell</span>
      </div>
    </footer>
  );
}
