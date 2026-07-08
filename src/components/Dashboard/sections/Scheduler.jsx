import {
  ArrowUpRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Plus,
} from "lucide-react";
import { useState } from "react";

// Mock data for scheduled payments or recurring subscriptions
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

export default function Scheduler() {
  const [events, setEvents] = useState(initialScheduledEvents);

  // Static state for simple calendar navigation representation
  const [currentMonth, setCurrentMonth] = useState("July 2026");

  // Generate standard 31-day matrix for July 2026 (Starting on a Wednesday)
  // 3 empty slots for padding matching Sunday-Tuesday offset
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const calendarPadding = Array.from({ length: 3 }, (_, i) => null);
  const totalCalendarSlots = [...calendarPadding, ...daysInMonth];

  // Map dates to flags for dates that have items due
  const eventDays = {
    12: "bg-red-500",
    15: "bg-blue-500",
    18: "bg-red-500",
    24: "bg-blue-500",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Section Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Payment Schedules</h2>
          <p className="text-sm text-gray-500">
            Track and manage your automated transfers, subscriptions, and
            recurring bills.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Add Schedule
        </button>
      </div>

      {/* Overview Analytics Matrix */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xs">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Total Scheduled
            </p>
            <p className="text-xl font-bold text-gray-900">$1,370.19</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xs">
          <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Next Outflow
            </p>
            <p className="text-xl font-bold text-gray-900">July 12</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xs">
          <div className="rounded-xl bg-green-50 p-3 text-green-600">
            <ArrowUpRight className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Active Autopays
            </p>
            <p className="text-xl font-bold text-gray-900">2 Accounts</p>
          </div>
        </div>
      </div>

      {/* Main Structural Layout split into Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Side: Calendar Interface */}
        <div className="flex flex-col rounded-2xl bg-white p-5 shadow-xs lg:col-span-7">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <span className="font-bold text-gray-800">{currentMonth}</span>
            </div>
            <div className="flex gap-1">
              <button className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-100">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar Headers */}
          <div className="mt-4 grid grid-cols-7 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Days Output Block */}
          <div className="mt-2 grid grid-cols-7 gap-y-2 text-center">
            {totalCalendarSlots.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-10" />;
              }

              const hasEventColor = eventDays[day];
              const isCurrentDay = day === 8; // Highlight placeholder current date indicator

              return (
                <div
                  key={`day-${day}`}
                  className="relative flex h-10 items-center justify-center"
                >
                  <span
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition hover:bg-gray-100 ${isCurrentDay ? "bg-blue-600 text-white hover:bg-blue-700" : "text-gray-800"}`}
                  >
                    {day}
                  </span>
                  {hasEventColor && !isCurrentDay && (
                    <span
                      className={`absolute bottom-1 h-1.5 w-1.5 rounded-full ${hasEventColor}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Execution Tasks queue list view */}
        <div className="flex flex-col rounded-2xl bg-white p-5 shadow-xs lg:col-span-5">
          <h3 className="text-base font-bold text-gray-900">Upcoming Queues</h3>
          <div className="mt-4 flex flex-col gap-3">
            {events.map((item) => {
              const formattedAmount = item.amount.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              });

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-3 transition hover:shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold ${item.status === "Automated" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}
                    >
                      {item.status === "Automated" ? "AUTO" : "BILL"}
                    </div>
                    <div>
                      <p className="text-sm leading-tight font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <span className="text-xs font-medium text-gray-400">
                        Due: {item.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {formattedAmount}
                    </p>
                    <span className="rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[11px] font-semibold text-gray-500">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
