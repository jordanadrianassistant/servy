"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Email o contraseña incorrectos");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen gradient-animated flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      {/* Ambient glow */}
      <div className="fixed top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#25D366]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-2xl flex items-center justify-center font-bold text-white text-2xl mx-auto mb-5 shadow-lg shadow-[#25D366]/20">
              S
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
          <p className="text-slate-400 mt-2">Accede a tu panel de Servy</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.05] backdrop-blur-sm rounded-2xl border border-white/10 p-8 space-y-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:border-[#25D366]/50 transition"
              placeholder="doctor@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#25D366]/50 focus:border-[#25D366]/50 transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#25D366] to-[#20bd5a] text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-[#25D366]/25 transition-all duration-300 disabled:opacity-50 text-sm"
          >
            {loading ? "Entrando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-[#25D366] font-medium hover:underline"
          >
            Crear cuenta gratis
          </Link>
        </p>
      </div>
    </div>
  );
}
