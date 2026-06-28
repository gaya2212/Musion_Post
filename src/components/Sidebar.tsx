"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Music2,
  Sparkles,
  Calendar,
  BarChart3,
  CheckSquare,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/releases", label: "Releases", icon: Music2 },
  { href: "/strategy", label: "AI Strategy", icon: Sparkles },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-zinc-950 text-white flex flex-col shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-zinc-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <span className="font-bold text-sm tracking-wide">Musion</span>
          <span className="text-violet-400 font-bold text-sm tracking-wide">
            Post
          </span>
        </div>
      </div>

      {/* Artist badge */}
      <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700">
        <p className="text-xs text-zinc-400">Logged in as</p>
        <p className="text-sm font-semibold text-white">Nova Kaine</p>
        <span className="text-xs text-violet-400">Pro Plan</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-violet-600 text-white"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <Settings size={17} />
          Settings
        </Link>
        <div className="mt-3 mx-2 p-3 rounded-lg bg-violet-900/40 border border-violet-800/50">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={13} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-300">
              AI Manager Active
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Monitoring 3 releases and executing 4 tasks
          </p>
        </div>
      </div>
    </aside>
  );
}
