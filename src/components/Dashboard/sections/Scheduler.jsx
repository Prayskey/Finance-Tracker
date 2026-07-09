import {
  ArrowUpRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Plus,
} from "lucide-react";
import { useMemo, useState } from "react";

const initialScheduledEvents = [
  {
    id: 1,
    title: "Adobe Creative Cloud",
    type: "Subscription",
    amount: 54.99,
    dueDate: "2026-07-12",
    status: "Pending",
    category: "Software",
  },
  {
    id: 2,
    title: "Monthly Rent Auto-Pay",
    type: "Transfer",
    amount: 1200.0,
    dueDate: "2026-07-15",
    status: "Automated",
    category: "Housing",
  },
  {
    id: 3,
    title: "Gym Membership",
    type: "Subscription",
    amount: 30.0,
    dueDate: "2026-07-18",
    status: "Pending",
    category: "Health",
  },
  {
    id: 4,
    title: "Electricity Autopay",
    type: "Utility",
    amount: 85.2,
    dueDate: "2026-07-24",
    status: "Automated",
    category: "Utilities",
  },
];

const STATUS_DOT_COLOR = {
  Automated: "bg-blue-500",
  Pending: "bg-red-500",
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatCurrency = (value) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Scheduler() {
  const [events, setEvents] = useState(initialScheduledEvents);
  // First-of-month Date drives the whole calendar; swap this out for a
  // real "add schedule" flow (modal/form) when that's built.
  const [viewDate, setViewDate] = useState(() => new Date(2026, 6, 1));

  const today = new Date();

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goToPrevMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const { totalSlots, eventDays } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();

    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const padding = Array.from({ length: firstWeekday }, () => null);

    const dayColors = {};
    events.forEach((event) => {
      const due = new Date(event.dueDate);
      if (due.getFullYear() === year && due.getMonth() === month) {
        dayColors[due.getDate()] =
          STATUS_DOT_COLOR[event.status] ?? "bg-gray-400";
      }
    });

    return { totalSlots: [...padding, ...days], eventDays: dayColors };
  }, [events, viewDate]);

  const stats = useMemo(() => {
    const totalScheduled = events.reduce((sum, e) => sum + e.amount, 0);

    const upcoming = events
      .filter((e) => new Date(e.dueDate) >= new Date(today.toDateString()))
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    const nextOutflow = upcoming[0]
      ? new Date(upcoming[0].dueDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      : "—";

    const activeAutopays = events.filter(
      (e) => e.status === "Automated",
    ).length;

    return { totalScheduled, nextOutflow, activeAutopays };
  }, [events]);

  const handleAddSchedule = () => {
    // TODO: open an add-schedule modal/form and setEvents((prev) => [...prev, newEvent])
  };

  return (
    <div className="flex flex-col gap-4 p-1 md:gap-6 md:p-0">
      {/* Top Header Actions block */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Payment Schedules</h2>
          <p className="text-sm text-gray-500">
            Track and manage your automated transfers, subscriptions, and
            recurring bills.
          </p>
        </div>
        <button
          onClick={handleAddSchedule}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Schedule
        </button>
      </div>

      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:gap-4">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-xs sm:p-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase sm:text-xs">
              Total Scheduled
            </p>
            <p className="text-lg font-bold text-gray-900 sm:text-xl">
              {formatCurrency(stats.totalScheduled)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-xs sm:p-4">
          <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase sm:text-xs">
              Next Outflow
            </p>
            <p className="text-lg font-bold text-gray-900 sm:text-xl">
              {stats.nextOutflow}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-xs sm:p-4">
          <div className="rounded-xl bg-green-50 p-3 text-green-600">
            <ArrowUpRight className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase sm:text-xs">
              Active Autopays
            </p>
            <p className="text-lg font-bold text-gray-900 sm:text-xl">
              {stats.activeAutopays}{" "}
              {stats.activeAutopays === 1 ? "Account" : "Accounts"}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Split Columns Layout Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        {/* Left Card: Calendar grid interface view */}
        <div className="flex flex-col rounded-2xl bg-white p-4 shadow-xs sm:p-5 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span className="text-base font-bold text-gray-800">
                {monthLabel}
              </span>
            </div>
            <div className="flex gap-1">
              <button
                onClick={goToPrevMonth}
                aria-label="Previous month"
                className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={goToNextMonth}
                aria-label="Next month"
                className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Table Row Calendar Week Day Labels */}
          <div className="mt-4 grid grid-cols-7 text-center text-[10px] font-bold tracking-wider text-gray-400 uppercase sm:text-xs">
            {WEEKDAY_LABELS.map((label) => (
              <div key={label}>{label}</div>
            ))}
          </div>

          {/* Matrix Dynamic Grid Container */}
          <div className="mt-2 grid grid-cols-7 gap-y-1 text-center sm:gap-y-2">
            {totalSlots.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-9 sm:h-10" />;
              }

              const hasEventColor = eventDays[day];
              const isCurrentDay =
                day === today.getDate() &&
                viewDate.getMonth() === today.getMonth() &&
                viewDate.getFullYear() === today.getFullYear();

              return (
                <div
                  key={`day-${day}`}
                  className="relative flex h-9 items-center justify-center sm:h-10"
                >
                  <span
                    className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xs font-medium transition hover:bg-gray-100 sm:h-8 sm:w-8 sm:text-sm ${
                      isCurrentDay
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-800"
                    }`}
                  >
                    {day}
                  </span>
                  {hasEventColor && !isCurrentDay && (
                    <span
                      className={`absolute bottom-0.5 h-1.5 w-1.5 rounded-full sm:bottom-1 ${hasEventColor}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Upcoming Execution Queue panel list */}
        <div className="flex flex-col rounded-2xl bg-white p-4 shadow-xs sm:p-5 lg:col-span-5">
          <h3 className="text-base font-bold text-gray-900">Upcoming Queues</h3>
          <div className="mt-4 flex flex-col gap-2.5 sm:gap-3">
            {events.length === 0 ? (
              <p className="text-sm text-gray-500">No scheduled items yet.</p>
            ) : (
              events.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50/50 p-2.5 transition hover:shadow-xs sm:p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold sm:h-10 sm:w-10 sm:text-xs ${
                        item.status === "Automated"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status === "Automated" ? "AUTO" : "BILL"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs leading-tight font-semibold text-gray-900 sm:text-sm">
                        {item.title}
                      </p>
                      <span className="block truncate text-[11px] font-medium text-gray-400 sm:text-xs">
                        Due: {item.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs font-bold text-gray-900 sm:text-sm">
                      {formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
