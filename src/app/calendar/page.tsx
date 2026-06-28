"use client";

import { useState } from "react";
import { Calendar, Sparkles, Music2, Megaphone, FileText } from "lucide-react";
import { calendarEvents } from "@/lib/data";
import type { CalendarEvent } from "@/lib/types";

const TYPE_COLORS: Record<CalendarEvent["type"], string> = {
  release: "bg-green-500",
  promo: "bg-blue-500",
  pitch: "bg-amber-500",
  content: "bg-purple-500",
  review: "bg-zinc-500",
  "campaign-start": "bg-emerald-500",
  "campaign-end": "bg-red-400",
};

const TYPE_LABELS: Record<CalendarEvent["type"], string> = {
  release: "Release",
  promo: "Promo",
  pitch: "Pitch",
  content: "Content",
  review: "Review",
  "campaign-start": "Campaign Start",
  "campaign-end": "Campaign End",
};

function getTypeIcon(type: CalendarEvent["type"]) {
  switch (type) {
    case "release":
      return <Music2 size={12} className="text-white" />;
    case "promo":
    case "campaign-start":
    case "campaign-end":
      return <Megaphone size={12} className="text-white" />;
    case "pitch":
      return <FileText size={12} className="text-white" />;
    default:
      return <Sparkles size={12} className="text-white" />;
  }
}

// Get all unique months from events
function getMonthsRange(events: CalendarEvent[]) {
  const dates = events.map((e) => new Date(e.date));
  const min = new Date(Math.min(...dates.map((d) => d.getTime())));
  const max = new Date(Math.max(...dates.map((d) => d.getTime())));
  const months: Date[] = [];
  const cur = new Date(min.getFullYear(), min.getMonth(), 1);
  const end = new Date(max.getFullYear(), max.getMonth(), 1);
  while (cur <= end) {
    months.push(new Date(cur));
    cur.setMonth(cur.getMonth() + 1);
  }
  return months;
}

function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) grid.push(null);
  for (let d = 1; d <= daysInMonth; d++) grid.push(d);
  return grid;
}

export default function CalendarPage() {
  const months = getMonthsRange(calendarEvents);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const currentMonth = months[selectedMonth];
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const grid = buildCalendarGrid(year, month);

  function toISODate(y: number, m: number, d: number) {
    return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }

  function eventsOnDay(day: number) {
    const dateStr = toISODate(year, month, day);
    return calendarEvents.filter((e) => e.date === dateStr);
  }

  const monthEvents = calendarEvents.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <Calendar size={22} className="text-violet-600" />
            Release Calendar
          </h1>
          <p className="text-zinc-500 mt-1">
            Every promotional event, content drop, and release date—AI-scheduled
            and managed
          </p>
        </div>
        <button className="bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2">
          <Sparkles size={14} />
          Auto-Schedule
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-6">
        {(
          Object.keys(TYPE_COLORS) as CalendarEvent["type"][]
        ).map((type) => (
          <div key={type} className="flex items-center gap-1.5">
            <div
              className={`w-2.5 h-2.5 rounded-full ${TYPE_COLORS[type]}`}
            />
            <span className="text-xs text-zinc-500">{TYPE_LABELS[type]}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 ml-2">
          <Sparkles size={12} className="text-violet-500" />
          <span className="text-xs text-violet-500">AI-scheduled</span>
        </div>
      </div>

      {/* Month tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {months.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMonth(i)}
            className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMonth === i
                ? "bg-violet-600 text-white"
                : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            }`}
          >
            {m.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar grid */}
        <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl p-5">
          <h2 className="font-semibold text-zinc-900 mb-4">
            {currentMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium text-zinc-400 py-1"
              >
                {d}
              </div>
            ))}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {grid.map((day, i) => {
              if (!day)
                return <div key={`empty-${i}`} className="h-16 rounded-lg" />;
              const dayEvents = eventsOnDay(day);
              const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === month &&
                new Date().getFullYear() === year;
              return (
                <div
                  key={day}
                  className={`h-16 rounded-lg p-1 border transition-colors ${
                    isToday
                      ? "border-violet-300 bg-violet-50"
                      : dayEvents.length > 0
                        ? "border-zinc-200 bg-white hover:border-violet-200"
                        : "border-transparent bg-zinc-50/50"
                  }`}
                >
                  <p
                    className={`text-xs font-medium mb-0.5 ${
                      isToday ? "text-violet-600" : "text-zinc-600"
                    }`}
                  >
                    {day}
                  </p>
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px] font-medium text-white leading-none ${TYPE_COLORS[ev.type]}`}
                      >
                        {getTypeIcon(ev.type)}
                        <span className="truncate">{ev.title}</span>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-zinc-400 px-1">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event list for month */}
        <div className="bg-white border border-zinc-200 rounded-xl p-5">
          <h2 className="font-semibold text-zinc-900 mb-4">
            Events This Month
          </h2>
          {monthEvents.length === 0 ? (
            <p className="text-sm text-zinc-400">No events this month.</p>
          ) : (
            <div className="space-y-2">
              {monthEvents
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100"
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${TYPE_COLORS[ev.type]}`}
                    >
                      {getTypeIcon(ev.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <p className="text-sm font-medium text-zinc-900 truncate">
                          {ev.title}
                        </p>
                        {ev.isAiScheduled && (
                          <Sparkles
                            size={10}
                            className="text-violet-500 shrink-0"
                          />
                        )}
                      </div>
                      <p className="text-xs text-zinc-500">{ev.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-zinc-400">
                          {new Date(ev.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded text-white ${TYPE_COLORS[ev.type]}`}
                        >
                          {TYPE_LABELS[ev.type]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
