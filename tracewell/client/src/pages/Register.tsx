import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import ChatWidget from "../components/ChatWidget";
import { useAuth } from "../lib/auth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = register(email, password, name);
    if (!result.ok) {
      setError(result.error || "Registration failed.");
      return;
    }
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="mx-auto max-w-sm px-6 py-16">
        <h1 className="text-xl font-medium">Register</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Demo auth — new accounts get the customer role, stored locally.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-neutral-400">Name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
          </div>
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
              minLength={6}
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
            Create account
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-neutral-500">
          Already have an account?{" "}
          <Link to="/login" className="text-neutral-300 underline underline-offset-2">
            Log in
          </Link>
        </p>
      </main>
      <ChatWidget />
    </div>
  );
}
