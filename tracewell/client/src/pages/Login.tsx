import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error || "Login failed.");
      return;
    }
    navigate("/");
  }

  function fillDemo(role: "admin" | "customer") {
    if (role === "admin") {
      setEmail("admin@demo.com");
      setPassword("admin123");
    } else {
      setEmail("user@demo.com");
      setPassword("user123");
    }
    setError("");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-sm px-6 py-16">
        <h1 className="text-xl font-medium">Log in</h1>
        <p className="mt-1 text-sm text-neutral-400">Demo auth — not connected to real accounts yet.</p>

        <div className="mt-4 rounded-md border border-white/10 bg-neutral-950 p-3 text-xs text-neutral-400">
          <div className="mb-2 font-medium text-neutral-300">Test accounts</div>
          <button
            type="button"
            onClick={() => fillDemo("admin")}
            className="mb-1 block w-full rounded border border-white/10 px-2 py-1.5 text-left hover:bg-white/5"
          >
            Admin — admin@demo.com / admin123
          </button>
          <button
            type="button"
            onClick={() => fillDemo("customer")}
            className="block w-full rounded border border-white/10 px-2 py-1.5 text-left hover:bg-white/5"
          >
            Customer — user@demo.com / user123
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          {error && <div className="text-xs text-red-400">{error}</div>}
          <button
            type="submit"
            className="w-full rounded-md bg-white py-2 text-sm font-medium text-black hover:bg-neutral-500 hover:text-white transition-colors"
          >
            Log in
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-neutral-500">
          No account?{" "}
          <Link to="/register" className="text-neutral-300 underline underline-offset-2">
            Register
          </Link>
        </p>
      </main>
      <ChatWidget />
    </div>
  );
}
