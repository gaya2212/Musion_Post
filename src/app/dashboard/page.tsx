import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Music2,
  CheckSquare,
  Calendar,
  ArrowRight,
  Zap,
  AlertCircle,
} from "lucide-react";
import { releases, promotionalTasks, aiRecommendations, artistProfile, calendarEvents } from "@/lib/data";
import {
  getStageLabel,
  getStageColor,
  getStageProgress,
  formatStreams,
  getAiScoreColor,
  daysUntil,
  formatDate,
} from "@/lib/utils";

export default function DashboardPage() {
  const activeRelease = releases.find((r) => r.stage === "launch");
  const upcomingRelease = releases.find((r) => r.stage === "production");
  const pendingTasks = promotionalTasks.filter(
    (t) => t.status === "pending" || t.status === "in-progress"
  );
  const completedTasks = promotionalTasks.filter((t) => t.status === "completed");
  const topRecs = aiRecommendations.filter((r) => !r.isActioned).slice(0, 3);
  const nextEvents = calendarEvents
    .filter((e) => daysUntil(e.date) >= 0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">
          Good morning, {artistProfile.name.split(" ")[0]} 👋
        </h1>
        <p className="text-zinc-500 mt-1">
          Your AI manager has been busy. Here&apos;s your label status.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-zinc-200 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            Monthly Listeners
          </p>
          <p className="text-2xl font-bold mt-1">
            {formatStreams(artistProfile.monthlyListeners)}
          </p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp size={12} /> +25.8% this month
          </p>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            Total Streams
          </p>
          <p className="text-2xl font-bold mt-1">
            {formatStreams(artistProfile.totalStreams)}
          </p>
          <p className="text-xs text-zinc-400 mt-1">Across all releases</p>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            AI Tasks Done
          </p>
          <p className="text-2xl font-bold mt-1">{completedTasks.length}</p>
          <p className="text-xs text-zinc-400 mt-1">
            {pendingTasks.length} pending
          </p>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-5">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            Active Releases
          </p>
          <p className="text-2xl font-bold mt-1">{releases.length}</p>
          <p className="text-xs text-zinc-400 mt-1">
            {releases.filter((r) => r.stage === "launch" || r.stage === "pre-release").length} near launch
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Release */}
          {activeRelease && (
            <div className="bg-white rounded-xl border border-zinc-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
                  <Music2 size={16} className="text-violet-600" />
                  Active Release
                </h2>
                <Link
                  href="/releases"
                  className="text-xs text-violet-600 hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight size={12} />
                </Link>
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-zinc-900">
                    {activeRelease.title}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    {activeRelease.genre} · {activeRelease.bpm} BPM ·{" "}
                    {activeRelease.key}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium ${getStageColor(activeRelease.stage)}`}
                >
                  {getStageLabel(activeRelease.stage)}
                </span>
              </div>

              {/* Release countdown */}
              <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-center gap-3">
                <AlertCircle size={16} className="text-amber-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">
                    {daysUntil(activeRelease.releaseDate) > 0
                      ? `${daysUntil(activeRelease.releaseDate)} days until release`
                      : "Released today!"}
                  </p>
                  <p className="text-xs text-amber-600">
                    {formatDate(activeRelease.releaseDate)} ·{" "}
                    {activeRelease.pressContacts} press contacts engaged
                  </p>
                </div>
              </div>

              {/* Lifecycle progress */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                  <span>Release lifecycle</span>
                  <span>{getStageProgress(activeRelease.stage)}%</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-violet-500 rounded-full transition-all"
                    style={{
                      width: `${getStageProgress(activeRelease.stage)}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-zinc-400">
                  {["Concept", "Production", "Pre-Release", "Launch", "Post-Release", "Growth"].map(
                    (s) => (
                      <span key={s}>{s}</span>
                    )
                  )}
                </div>
              </div>

              {/* AI Score */}
              <div className="mt-4 flex items-center gap-3">
                <Sparkles size={14} className="text-violet-500" />
                <span className="text-sm text-zinc-600">AI Release Score:</span>
                <span
                  className={`text-sm font-bold ${getAiScoreColor(activeRelease.aiScore)}`}
                >
                  {activeRelease.aiScore}/100
                </span>
                <span className="text-xs text-zinc-400">
                  (Excellent momentum)
                </span>
              </div>
            </div>
          )}

          {/* AI Recommendations Preview */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
                <Sparkles size={16} className="text-violet-600" />
                AI Recommendations
              </h2>
              <Link
                href="/strategy"
                className="text-xs text-violet-600 hover:underline flex items-center gap-1"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {topRecs.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-zinc-900">
                      {rec.title}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">{rec.summary}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-500">
                        {rec.releaseTitle}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
                <Calendar size={15} className="text-violet-600" />
                Upcoming
              </h2>
              <Link
                href="/calendar"
                className="text-xs text-violet-600 hover:underline"
              >
                Calendar
              </Link>
            </div>
            <div className="space-y-2">
              {nextEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex items-start gap-3 py-2 border-b border-zinc-50 last:border-0"
                >
                  <div className="shrink-0 text-center min-w-[36px]">
                    <p className="text-xs font-bold text-violet-600">
                      {new Date(ev.date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </p>
                    <p className="text-base font-bold text-zinc-900 leading-none">
                      {new Date(ev.date).getDate()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 leading-tight">
                      {ev.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {ev.isAiScheduled && (
                        <span className="text-violet-400">AI · </span>
                      )}
                      {ev.releaseTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-zinc-900 flex items-center gap-2">
                <CheckSquare size={15} className="text-violet-600" />
                Pending Tasks
              </h2>
              <Link
                href="/tasks"
                className="text-xs text-violet-600 hover:underline"
              >
                All tasks
              </Link>
            </div>
            <div className="space-y-2">
              {pendingTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-2 py-2 border-b border-zinc-50 last:border-0"
                >
                  {task.isAiExecuted ? (
                    <Zap size={14} className="text-violet-500 mt-0.5 shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-300 mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-zinc-900 leading-tight">
                      {task.title}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Due {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming release */}
          {upcomingRelease && (
            <div className="bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl p-5 text-white">
              <p className="text-xs font-medium text-violet-200 uppercase tracking-wide mb-2">
                Next Up
              </p>
              <h3 className="font-bold text-lg">{upcomingRelease.title}</h3>
              <p className="text-sm text-violet-200 mt-0.5">
                {formatDate(upcomingRelease.releaseDate)}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Sparkles size={13} className="text-violet-300" />
                <span className="text-xs text-violet-200">
                  AI Score: {upcomingRelease.aiScore}/100
                </span>
              </div>
              <Link
                href="/releases"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-white hover:text-violet-200 transition-colors"
              >
                View strategy <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
