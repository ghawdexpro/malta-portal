"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/admin";
        return;
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-malta-dark to-malta-dark/90 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-malta-gold text-malta-dark font-black text-lg">
            MT
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">Admin Access</h1>
          <p className="mt-1 text-sm text-white/50">Malta Travel Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            required
            className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:border-malta-gold focus:ring-1 focus:ring-malta-gold"
          />
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-malta-gold px-4 py-3 font-semibold text-malta-dark transition-colors hover:bg-malta-gold/90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
