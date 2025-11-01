"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication (in production, use proper backend authentication)
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("admin-authenticated", "true");
      router.push("/admin");
    } else {
      setError("Invalid credentials. Try username: admin, password: admin123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-2xl mb-4">
            <ShieldCheck className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
            Admin Login
          </h1>
          <p className="text-slate-600">
            Access the restaurant management panel
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              Login to Admin Panel
            </button>

            <div className="text-center text-sm text-slate-600">
              <p className="mb-1">Demo Credentials:</p>
              <p className="font-mono bg-slate-100 px-3 py-2 rounded-lg">
                Username: <span className="font-bold">admin</span> | Password:{" "}
                <span className="font-bold">admin123</span>
              </p>
            </div>
          </form>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-orange-600 dark:text-teal-400 hover:underline font-medium"
          >
            ← Back to Restaurant
          </a>
        </div>
      </div>
    </div>
  );
}
