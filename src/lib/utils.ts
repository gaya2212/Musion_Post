import type {
  Release,
  AiRecommendation,
  PromotionalTask,
  ReleaseStage,
} from "./types";

/** Returns a label for the release stage */
export function getStageLabel(stage: ReleaseStage): string {
  const labels: Record<ReleaseStage, string> = {
    concept: "Concept",
    production: "In Production",
    "pre-release": "Pre-Release",
    launch: "Launch Ready",
    "post-release": "Post-Release",
    growth: "Growth",
  };
  return labels[stage];
}

/** Returns Tailwind color classes for a given release stage */
export function getStageColor(stage: ReleaseStage): string {
  const colors: Record<ReleaseStage, string> = {
    concept: "bg-zinc-100 text-zinc-600",
    production: "bg-blue-100 text-blue-700",
    "pre-release": "bg-amber-100 text-amber-700",
    launch: "bg-green-100 text-green-700",
    "post-release": "bg-purple-100 text-purple-700",
    growth: "bg-emerald-100 text-emerald-700",
  };
  return colors[stage];
}

/** Returns the progress percentage for a release lifecycle stage */
export function getStageProgress(stage: ReleaseStage): number {
  const progress: Record<ReleaseStage, number> = {
    concept: 5,
    production: 25,
    "pre-release": 55,
    launch: 75,
    "post-release": 90,
    growth: 100,
  };
  return progress[stage];
}

/** Formats a stream count as a human-readable string */
export function formatStreams(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
  return count.toString();
}

/** Returns impact badge color */
export function getImpactColor(
  impact: AiRecommendation["impact"]
): string {
  const colors = {
    low: "bg-zinc-100 text-zinc-600",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-green-100 text-green-700",
  };
  return colors[impact];
}

/** Returns priority badge color */
export function getPriorityColor(
  priority: PromotionalTask["priority"]
): string {
  const colors = {
    low: "bg-zinc-100 text-zinc-600",
    medium: "bg-blue-100 text-blue-700",
    high: "bg-amber-100 text-amber-700",
    critical: "bg-red-100 text-red-700",
  };
  return colors[priority];
}

/** Returns task status color */
export function getStatusColor(
  status: PromotionalTask["status"]
): string {
  const colors = {
    pending: "bg-zinc-100 text-zinc-500",
    "in-progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    approved: "bg-purple-100 text-purple-700",
  };
  return colors[status];
}

/** Returns AI score color based on score value */
export function getAiScoreColor(score: number): string {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-amber-600";
  return "text-red-500";
}

/** Calculates overall release health based on current data */
export function getReleaseHealthScore(release: Release): number {
  return release.aiScore;
}

/** Groups tasks by status for summary display */
export function groupTasksByStatus(
  tasks: PromotionalTask[]
): Record<PromotionalTask["status"], number> {
  return tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { pending: 0, "in-progress": 0, completed: 0, approved: 0 }
  );
}

/** Returns days until a date string, negative if in the past */
export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/** Formats a date string to a readable format */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
