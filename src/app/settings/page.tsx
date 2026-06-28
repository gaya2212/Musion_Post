import { Settings, Zap, Music2, CreditCard } from "lucide-react";
import { artistProfile } from "@/lib/data";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
          <Settings size={22} className="text-violet-600" />
          Settings
        </h1>
        <p className="text-zinc-500 mt-1">
          Manage your artist profile, AI preferences, and plan
        </p>
      </div>

      {/* Artist Profile */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <Music2 size={16} className="text-violet-600" />
          Artist Profile
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Artist Name
            </label>
            <input
              defaultValue={artistProfile.name}
              className="mt-1 w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Primary Genre
            </label>
            <input
              defaultValue={artistProfile.genre}
              className="mt-1 w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      {/* AI Preferences */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <Zap size={16} className="text-violet-600" />
          AI Manager Preferences
        </h2>
        <div className="space-y-4">
          {[
            {
              label: "Auto-schedule promotional content",
              description: "AI automatically schedules social posts and campaigns",
              enabled: true,
            },
            {
              label: "Auto-submit to Spotify editorial",
              description: "AI submits tracks to editorial playlists at optimal timing",
              enabled: true,
            },
            {
              label: "Auto-pitch to independent curators",
              description: "AI pitches to curators after first-week streaming data is available",
              enabled: true,
            },
            {
              label: "Press outreach automation",
              description: "AI sends personalized press kits to identified music blogs",
              enabled: false,
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between py-3 border-b border-zinc-50 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900">{pref.label}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{pref.description}</p>
              </div>
              <div
                className={`w-10 h-5 rounded-full transition-colors cursor-pointer ${
                  pref.enabled ? "bg-violet-600" : "bg-zinc-200"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-all shadow-sm ${
                    pref.enabled ? "translate-x-5 ml-0.5" : "translate-x-0.5"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        <h2 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
          <CreditCard size={16} className="text-violet-600" />
          Current Plan
        </h2>
        <div className="bg-violet-50 border border-violet-100 rounded-lg p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-violet-900 capitalize">
              {artistProfile.plan} Plan
            </p>
            <p className="text-sm text-violet-600 mt-0.5">
              AI manager active · 3 releases · Unlimited tasks
            </p>
          </div>
          <button className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">
            Upgrade to Label
          </button>
        </div>
      </div>
    </div>
  );
}
