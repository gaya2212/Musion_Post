"use client";

import { useState } from "react";
import {
  CheckSquare,
  Sparkles,
  Zap,
  CheckCircle,
  Clock,
  Play,
  AlertCircle,
} from "lucide-react";
import { promotionalTasks, releases } from "@/lib/data";
import {
  getPriorityColor,
  getStatusColor,
  formatDate,
} from "@/lib/utils";
import type { PromotionalTask } from "@/lib/types";

const CATEGORY_ICONS: Record<PromotionalTask["category"], React.ReactNode> = {
  social: <Sparkles size={13} />,
  playlist: <CheckSquare size={13} />,
  press: <AlertCircle size={13} />,
  advertising: <Zap size={13} />,
  content: <Play size={13} />,
  distribution: <CheckCircle size={13} />,
};

const STATUS_ICONS: Record<PromotionalTask["status"], React.ReactNode> = {
  pending: <Clock size={14} className="text-zinc-400" />,
  "in-progress": <Play size={14} className="text-blue-500" />,
  completed: <CheckCircle size={14} className="text-green-500" />,
  approved: <CheckCircle size={14} className="text-purple-500" />,
};

export default function TasksPage() {
  const [filter, setFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const releaseOptions = [
    { value: "all", label: "All Releases" },
    ...releases.map((r) => ({ value: r.id, label: r.title })),
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const filtered = promotionalTasks.filter((t) => {
    const releaseMatch = filter === "all" || t.releaseId === filter;
    const statusMatch = statusFilter === "all" || t.status === statusFilter;
    return releaseMatch && statusMatch;
  });

  const aiExecuted = filtered.filter((t) => t.isAiExecuted).length;
  const completed = filtered.filter((t) => t.status === "completed").length;
  const pending = filtered.filter(
    (t) => t.status === "pending" || t.status === "in-progress"
  ).length;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
          <CheckSquare size={22} className="text-violet-600" />
          Task Automation
        </h1>
        <p className="text-zinc-500 mt-1">
          AI-generated and AI-executed promotional tasks across your entire
          release lifecycle
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-zinc-900">{completed}</p>
          <p className="text-xs text-zinc-500 mt-0.5">Completed</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">{pending}</p>
          <p className="text-xs text-amber-600 mt-0.5">Pending</p>
        </div>
        <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-violet-700">{aiExecuted}</p>
          <p className="text-xs text-violet-600 mt-0.5">AI Executed</p>
        </div>
      </div>

      {/* AI automation banner */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-xl p-5 mb-6 flex items-center gap-4">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
          <Zap size={20} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold">AI Manager is executing tasks for you</p>
          <p className="text-sm text-violet-200 mt-0.5">
            {aiExecuted} tasks have been fully handled by your AI manager — press
            pitching, playlist submissions, social scheduling, and ad campaigns.
            You only need to approve strategy.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex gap-1 flex-wrap">
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
        <div className="flex gap-1 flex-wrap">
          {statusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`text-sm px-3 py-1.5 rounded-lg font-medium transition-colors ${
                statusFilter === opt.value
                  ? "bg-zinc-800 text-white"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filtered.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-zinc-400">
            No tasks found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: PromotionalTask }) {
  const [showResult, setShowResult] = useState(false);

  return (
    <div
      className={`bg-white border rounded-xl overflow-hidden transition-all ${
        task.status === "completed"
          ? "border-zinc-100 opacity-80"
          : "border-zinc-200"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          {/* Status icon */}
          <div className="mt-0.5 shrink-0">{STATUS_ICONS[task.status]}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full capitalize flex items-center gap-1">
                    {CATEGORY_ICONS[task.category]}
                    {task.category}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {task.releaseTitle}
                  </span>
                  {task.isAiGenerated && (
                    <span className="text-xs text-violet-500 flex items-center gap-0.5">
                      <Sparkles size={9} /> AI Generated
                    </span>
                  )}
                  {task.isAiExecuted && (
                    <span className="text-xs text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Zap size={9} /> AI Executed
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-zinc-900">{task.title}</h3>
                <p className="text-sm text-zinc-500 mt-1 leading-relaxed">
                  {task.description}
                </p>
              </div>

              {/* Priority + due date */}
              <div className="shrink-0 text-right">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
                <p className="text-xs text-zinc-400 mt-1.5">
                  Due {formatDate(task.dueDate)}
                </p>
              </div>
            </div>

            {/* Status + actions row */}
            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${getStatusColor(task.status)}`}
              >
                {task.status}
              </span>

              <div className="flex items-center gap-2">
                {task.executionResult && (
                  <button
                    onClick={() => setShowResult(!showResult)}
                    className="text-xs text-violet-600 hover:underline"
                  >
                    {showResult ? "Hide result" : "View AI result"}
                  </button>
                )}
                {task.status !== "completed" && !task.isAiExecuted && (
                  <button className="text-xs bg-violet-600 text-white px-3 py-1 rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-1">
                    <Zap size={11} />
                    AI Execute
                  </button>
                )}
              </div>
            </div>

            {/* Execution result */}
            {showResult && task.executionResult && (
              <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1">
                  <CheckCircle size={11} /> AI Execution Result
                </p>
                <p className="text-xs text-green-600 leading-relaxed">
                  {task.executionResult}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
