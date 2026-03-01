"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: "📊" },
  { href: "/dashboard/conversations", label: "Conversaciones", icon: "💬" },
  { href: "/dashboard/appointments", label: "Citas", icon: "📅" },
  { href: "/dashboard/services", label: "Servicios", icon: "🏥" },
  { href: "/dashboard/availability", label: "Horario", icon: "🕐" },
  { href: "/dashboard/simulator", label: "Simulador", icon: "🧪" },
  { href: "/dashboard/settings", label: "Configuración", icon: "⚙️" },
];

function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="px-6 py-5 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-[#25D366] to-[#20bd5a] rounded-xl flex items-center justify-center font-bold text-white shadow-sm">
              S
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Servy
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#25D366]/10 text-[#25D366]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center text-slate-600 text-sm font-bold">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {session?.user?.name || "Usuario"}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-xs text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition text-left"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardSidebar>{children}</DashboardSidebar>
    </SessionProvider>
  );
}
