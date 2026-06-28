import Link from "next/link";
import {
  Sparkles,
  Music2,
  Calendar,
  TrendingUp,
  CheckSquare,
  ArrowRight,
} from "lucide-react";
import { releases, promotionalTasks } from "@/lib/data";
import {
  getStageLabel,
  getStageColor,
  getStageProgress,
  formatStreams,
  getAiScoreColor,
  daysUntil,
  formatDate,
} from "@/lib/utils";
import type { ReleaseStage } from "@/lib/types";

const stageOrder: ReleaseStage[] = [
  "concept",
  "production",
  "pre-release",
  "launch",
  "post-release",
  "growth",
];

export default function ReleasesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <Music2 size={22} className="text-violet-600" />
            Releases
          </h1>
          <p className="text-zinc-500 mt-1">
            Manage every release from concept to sustained growth
          </p>
        </div>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2">
          <Music2 size={14} />
          New Release
        </button>
      </div>

      {/* Lifecycle pipeline visualization */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
        <h2 className="font-semibold text-zinc-800 mb-4">Release Pipeline</h2>
        <div className="flex items-stretch gap-1">
          {stageOrder.map((stage, i) => {
            const stageReleases = releases.filter((r) => r.stage === stage);
            const isActive = stageReleases.length > 0;
            return (
              <div key={stage} className="flex-1 min-w-0">
                <div
                  className={`text-center px-2 py-3 rounded-lg border transition-all ${
                    isActive
                      ? "bg-violet-50 border-violet-200"
                      : "bg-zinc-50 border-zinc-100"
                  }`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-wide mb-2 ${
                      isActive ? "text-violet-700" : "text-zinc-400"
                    }`}
                  >
                    {getStageLabel(stage)}
                  </p>
                  {stageReleases.length > 0 ? (
                    <div className="space-y-1">
                      {stageReleases.map((r) => (
                        <div
                          key={r.id}
                          className="bg-white border border-violet-200 rounded px-1.5 py-1"
                        >
                          <p className="text-xs font-medium text-zinc-900 truncate">
                            {r.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-zinc-300">—</div>
                  )}
                </div>
                {i < stageOrder.length - 1 && (
                  <div className="hidden" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Release cards */}
      <div className="space-y-6">
        {releases.map((release) => {
          const relTasks = promotionalTasks.filter(
            (t) => t.releaseId === release.id
          );
          const completedCount = relTasks.filter(
            (t) => t.status === "completed"
          ).length;
          const aiTaskCount = relTasks.filter((t) => t.isAiExecuted).length;
          const daysLeft = daysUntil(release.releaseDate);

          return (
            <div
              key={release.id}
              className="bg-white border border-zinc-200 rounded-xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-zinc-900">
                        {release.title}
                      </h2>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${getStageColor(release.stage)}`}
                      >
                        {getStageLabel(release.stage)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-500 mb-3">
                      {release.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {daysLeft > 0
                          ? `${daysLeft}d until release`
                          : daysLeft === 0
                            ? "Releasing today"
                            : `Released ${formatDate(release.releaseDate)}`}
                      </span>
                      <span>{release.genre}</span>
                      {release.bpm && <span>{release.bpm} BPM</span>}
                      {release.key && <span>Key: {release.key}</span>}
                      {release.streams > 0 && (
                        <span className="flex items-center gap-1.5">
                          <TrendingUp size={13} />
                          {formatStreams(release.streams)} streams
                        </span>
                      )}
                    </div>
                  </div>

                  {/* AI Score */}
                  <div className="text-center shrink-0">
                    <div
                      className={`text-3xl font-black ${getAiScoreColor(release.aiScore)}`}
                    >
                      {release.aiScore}
                    </div>
                    <div className="flex items-center gap-1 justify-center mt-0.5">
                      <Sparkles size={10} className="text-violet-500" />
                      <span className="text-[10px] text-zinc-400">
                        AI Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lifecycle bar */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs text-zinc-400 mb-1.5">
                    <span>Lifecycle progress</span>
                    <span>{getStageProgress(release.stage)}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full"
                      style={{ width: `${getStageProgress(release.stage)}%` }}
                    />
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 pt-4 border-t border-zinc-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-zinc-400">Streams</p>
                    <p className="text-sm font-semibold">
                      {formatStreams(release.streams) || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Saves</p>
                    <p className="text-sm font-semibold">
                      {release.saves > 0 ? formatStreams(release.saves) : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Playlists</p>
                    <p className="text-sm font-semibold">
                      {release.playlistPlacements || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Press Contacts</p>
                    <p className="text-sm font-semibold">
                      {release.pressContacts || "—"}
                    </p>
                  </div>
                </div>

                {/* Task summary */}
                <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <CheckSquare size={13} />
                      {completedCount}/{relTasks.length} tasks done
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={13} className="text-violet-500" />
                      {aiTaskCount} AI-executed
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/strategy"
                      className="text-xs text-violet-600 border border-violet-200 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors flex items-center gap-1"
                    >
                      <Sparkles size={11} /> AI Strategy
                    </Link>
                    <Link
                      href="/tasks"
                      className="text-xs bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-1"
                    >
                      View Tasks <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
