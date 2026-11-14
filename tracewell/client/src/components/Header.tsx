import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import Logo from "./Logo";

const navItems = [
  { label: "Landing page", href: "/landing-page" },
  { label: "Online store", href: "/online-store" },
  { label: "Popups", href: "/popups" },
  { label: "Blog", href: "/blog" },
  { label: "Custom", href: "/custom" },
];

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
      <div className="flex items-center gap-8">
        <Link to="/" className="logo flex items-center gap-2 text-sm font-medium">
          <Logo />
          Tracewell
        </Link>
        <nav className="hidden gap-5 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} className="text-link">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {user ? (
        <div className="flex items-center gap-3">
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="rounded-md border border-white/15 px-3.5 py-1.5 text-sm hover:bg-white/5 transition-colors"
            >
              Admin
            </Link>
          )}
          <span className="text-sm text-neutral-400">{user.name}</span>
          <button
            onClick={logout}
            className="rounded-md border border-white/15 px-3.5 py-1.5 text-sm hover:bg-white/5 transition-colors"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-md border border-white/15 px-3.5 py-1.5 text-sm hover:bg-white/5 transition-colors"
          >
            Log in
          </Link>
          <Link to="/register" className="btn-submit">
            Register
          </Link>
        </div>
      )}
    </header>
  );
}
