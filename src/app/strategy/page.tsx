"use client";

import { useState } from "react";
import {
  Sparkles,
  CheckCircle,
  TrendingUp,
  Clock,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { aiRecommendations, releases } from "@/lib/data";
import { getImpactColor } from "@/lib/utils";
import type { AiRecommendation } from "@/lib/types";

const typeLabels: Record<AiRecommendation["type"], string> = {
  strategy: "Strategy",
  timing: "Timing",
  platform: "Platform",
  content: "Content",
  audience: "Audience",
  budget: "Budget",
};

const typeIcons: Record<AiRecommendation["type"], React.ReactNode> = {
  strategy: <Sparkles size={14} />,
  timing: <Clock size={14} />,
  platform: <TrendingUp size={14} />,
  content: <Zap size={14} />,
  audience: <Sparkles size={14} />,
  budget: <TrendingUp size={14} />,
};

export default function StrategyPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const releaseOptions = [
    { value: "all", label: "All Releases" },
    ...releases.map((r) => ({ value: r.id, label: r.title })),
  ];

  const filtered =
    filter === "all"
      ? aiRecommendations
      : aiRecommendations.filter((r) => r.releaseId === filter);

  const active = filtered.filter((r) => !r.isActioned);
  const actioned = filtered.filter((r) => r.isActioned);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
          <Sparkles size={22} className="text-violet-600" />
          AI Strategy
        </h1>
        <p className="text-zinc-500 mt-1">
          Data-driven recommendations from your AI manager. Approve and
          execute—or let the AI handle it.
        </p>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-violet-700">{active.length}</p>
          <p className="text-xs text-violet-600 mt-0.5">Awaiting Action</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">{actioned.length}</p>
          <p className="text-xs text-green-600 mt-0.5">Actioned</p>
        </div>
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-zinc-700">
            {Math.round(
              filtered.reduce((s, r) => s + r.confidence, 0) /
                (filtered.length || 1)
            )}
            %
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">Avg. Confidence</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {releaseOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filter === opt.value
                ? "bg-violet-600 text-white"
                : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Active recommendations */}
      {active.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-zinc-800 mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-violet-500" />
            Awaiting Your Approval
          </h2>
          <div className="space-y-3">
            {active.map((rec) => (
              <RecommendationCard
                key={rec.id}
                rec={rec}
                expanded={expanded === rec.id}
                onToggle={() =>
                  setExpanded(expanded === rec.id ? null : rec.id)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Actioned */}
      {actioned.length > 0 && (
        <div>
          <h2 className="font-semibold text-zinc-800 mb-3 flex items-center gap-2">
            <CheckCircle size={15} className="text-green-500" />
            Actioned
          </h2>
          <div className="space-y-3 opacity-75">
            {actioned.map((rec) => (
              <RecommendationCard
                key={rec.id}
                rec={rec}
                expanded={expanded === rec.id}
                onToggle={() =>
                  setExpanded(expanded === rec.id ? null : rec.id)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({
  rec,
  expanded,
  onToggle,
}: {
  rec: AiRecommendation;
  expanded: boolean;
  onToggle: () => void;
}) {
  const impactColor = getImpactColor(rec.impact);
  const effortColor =
    rec.effort === "low"
      ? "text-green-600"
      : rec.effort === "medium"
        ? "text-amber-600"
        : "text-red-500";

  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <button
        className="w-full text-left p-5 flex items-start gap-4"
        onClick={onToggle}
      >
        {/* Type icon */}
        <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
          {typeIcons[rec.type]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">
                  {typeLabels[rec.type]}
                </span>
                <span className="text-xs text-zinc-400">
                  {rec.releaseTitle}
                </span>
                {rec.isActioned && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle size={10} /> Actioned
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-zinc-900">{rec.title}</h3>
              <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                {rec.summary}
              </p>
            </div>
            <div className="shrink-0">
              {expanded ? (
                <ChevronUp size={16} className="text-zinc-400" />
              ) : (
                <ChevronDown size={16} className="text-zinc-400" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${impactColor}`}
            >
              {rec.impact} impact
            </span>
            <span className={`text-xs font-medium ${effortColor}`}>
              {rec.effort} effort
            </span>
            <span className="text-xs text-zinc-400">
              {rec.confidence}% confidence
            </span>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-zinc-100">
          <div className="mt-4 p-4 bg-zinc-50 rounded-lg">
            <p className="text-sm text-zinc-700 leading-relaxed">
              {rec.details}
            </p>
          </div>
          {!rec.isActioned && (
            <div className="flex gap-3 mt-4">
              <button className="flex-1 bg-violet-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
                <Zap size={14} />
                Let AI Execute
              </button>
              <button className="flex-1 border border-zinc-200 text-zinc-700 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-50 transition-colors">
                Approve &amp; Do Manually
              </button>
              <button className="px-4 border border-zinc-200 text-zinc-400 py-2.5 rounded-lg text-sm hover:bg-zinc-50 transition-colors">
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
