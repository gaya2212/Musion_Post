"use client";

import {
  BarChart3,
  TrendingUp,
  Users,
  Music2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { analyticsData, artistProfile } from "@/lib/data";
import { formatStreams } from "@/lib/utils";

const PIE_COLORS = ["#7c3aed", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];

export default function AnalyticsPage() {
  const data = analyticsData[0];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
          <BarChart3 size={22} className="text-violet-600" />
          Analytics
        </h1>
        <p className="text-zinc-500 mt-1">
          AI-powered insights on your music&apos;s performance across all
          platforms
        </p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          label="Monthly Listeners"
          value={formatStreams(artistProfile.monthlyListeners)}
          change="+25.8%"
          positive
        />
        <KpiCard
          label="Followers"
          value={formatStreams(artistProfile.followers)}
          change="+21.9%"
          positive
        />
        <KpiCard
          label="Total Streams (Gravity Pull)"
          value={formatStreams(data.streams.reduce((s, d) => s + d.streams, 0))}
          change="-12% WoW"
          positive={false}
        />
        <KpiCard
          label="Playlist Placements"
          value="14"
          change="+14 from AI"
          positive
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Stream performance */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <h2 className="font-semibold text-zinc-800 mb-1 flex items-center gap-2">
            <TrendingUp size={15} className="text-violet-500" />
            Stream Performance — Gravity Pull
          </h2>
          <p className="text-xs text-zinc-400 mb-4">Daily streams since release</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.streams}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatStreams(v)}
              />
              <Tooltip
                formatter={(v) => [typeof v === "number" ? formatStreams(v) : String(v ?? ""), ""]}
                contentStyle={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="streams"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={false}
                name="Streams"
              />
              <Line
                type="monotone"
                dataKey="saves"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Saves"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Audience demographics */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <h2 className="font-semibold text-zinc-800 mb-1 flex items-center gap-2">
            <Users size={15} className="text-violet-500" />
            Audience Demographics
          </h2>
          <p className="text-xs text-zinc-400 mb-4">
            Age distribution of your listeners
          </p>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={data.demographics}
                  dataKey="percentage"
                  nameKey="age"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }: { name?: string; percent?: number }) =>
                    `${name ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {data.demographics.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend
                  formatter={(value) => (
                    <span style={{ fontSize: 11, color: "#52525b" }}>
                      {value}
                    </span>
                  )}
                />
                <Tooltip
                  formatter={(v) => [typeof v === "number" ? `${v}%` : String(v ?? ""), "Share"]}
                  contentStyle={{
                    border: "1px solid #e4e4e7",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform breakdown */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <h2 className="font-semibold text-zinc-800 mb-1 flex items-center gap-2">
            <Music2 size={15} className="text-violet-500" />
            Platform Breakdown
          </h2>
          <p className="text-xs text-zinc-400 mb-4">
            Streams by platform — Gravity Pull
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.platforms} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f4f4f5"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatStreams(v)}
              />
              <YAxis
                dataKey="platform"
                type="category"
                tick={{ fontSize: 11, fill: "#52525b" }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                formatter={(v) => [typeof v === "number" ? formatStreams(v) : String(v ?? ""), ""]}
                contentStyle={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="streams"
                fill="#7c3aed"
                radius={[0, 4, 4, 0]}
                name="Streams"
              />
              <Bar
                dataKey="playlistAdds"
                fill="#c4b5fd"
                radius={[0, 4, 4, 0]}
                name="Playlist Adds"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Follower growth */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <h2 className="font-semibold text-zinc-800 mb-1 flex items-center gap-2">
            <TrendingUp size={15} className="text-violet-500" />
            Audience Growth
          </h2>
          <p className="text-xs text-zinc-400 mb-4">
            Followers and monthly listeners over time
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#a1a1aa" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => formatStreams(v)}
              />
              <Tooltip
                formatter={(v) => [typeof v === "number" ? formatStreams(v) : String(v ?? ""), ""]}
                contentStyle={{
                  border: "1px solid #e4e4e7",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="monthlyListeners"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ fill: "#7c3aed", r: 3 }}
                name="Monthly Listeners"
              />
              <Line
                type="monotone"
                dataKey="followers"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 3 }}
                name="Followers"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-6 bg-violet-50 border border-violet-100 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
            <BarChart3 size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-violet-900 text-sm">
              AI Insight
            </p>
            <p className="text-sm text-violet-700 mt-1 leading-relaxed">
              Your 18–24 demographic (34% of listeners) is underserved on TikTok
              relative to engagement rates. Reallocating 20% of Instagram
              promotional budget to TikTok is projected to increase monthly
              listeners by 8–12% over 30 days. A recommendation has been added
              to your Strategy page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  label,
  value,
  change,
  positive,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p
        className={`text-xs mt-1 flex items-center gap-1 ${
          positive ? "text-green-600" : "text-red-500"
        }`}
      >
        <TrendingUp size={11} />
        {change}
      </p>
    </div>
  );
}
