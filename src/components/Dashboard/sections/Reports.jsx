import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
} from "lucide-react";

const categoryReportData = [
  { category: "Housing & Rent", allocated: 1500, spent: 1200 },
  { category: "Groceries & Food", allocated: 400, spent: 480 },
  { category: "Utilities & Bills", allocated: 300, spent: 260 },
  { category: "Entertainment & Leisure", allocated: 200, spent: 195 },
  { category: "Investments & Savings", allocated: 500, spent: 500 },
];

const getBudgetStatus = (spent, allocated) => {
  if (spent > allocated) return "Over Budget";
  if (spent === allocated) return "On Track";
  return "Under Budget";
};

const STATUS_STYLES = {
  "Over Budget": "bg-red-100 text-red-700",
  "Under Budget": "bg-green-100 text-green-700",
  "On Track": "bg-gray-100 text-gray-700",
};

export default function Reports() {
  const [reportTimeframe, setReportTimeframe] = useState("This Month");

  const handleExport = () => {
    // TODO: wire up to actual statement export (CSV/PDF) once backend supports it
  };

  return (
    <div className="flex flex-col gap-4 p-1 md:gap-6 md:p-0">
      {/* Top Header Row Controls Block Layout */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Financial Reports</h2>
          <p className="text-sm text-gray-500">
            Analyze your spending habits, statements, and budgetary allocations.
          </p>
        </div>
        {/* Action Dropdown Selection Items Container */}
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          {/* TODO: replace with real dropdown (e.g. listbox) once multiple
              timeframes are supported and stats below respond to selection */}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-xs transition hover:bg-gray-50"
          >
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{reportTimeframe}</span>
          </button>
          <button
            onClick={handleExport}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800 sm:flex-initial"
          >
            <Download className="h-4 w-4" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Summary Analytics Metric Delta Indicators Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {/* Net Cash Flow Balance Panel */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Net Cash Flow
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700">
              <TrendingUp className="h-3 w-3" /> +12.4%
            </span>
          </div>
          <p className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
            $2,450.80
          </p>
          <p className="mt-1 text-xs text-gray-400">
            vs last consecutive month window
          </p>
        </div>

        {/* Expense Trajectory Outflow Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Total Burn Outflow
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700">
              <TrendingDown className="h-3 w-3" /> -4.1%
            </span>
          </div>
          <p className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
            $2,630.00
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Total strict expenditures counted
          </p>
        </div>

        {/* Budget Accuracy Progress Tracker Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs sm:col-span-2 sm:p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Budget Accuracy Rate
            </span>
            <span className="text-blue-600">
              <BarChart3 className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-xl font-bold text-gray-900 sm:text-2xl">
            92.5%
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: "92.5%" }}
            />
          </div>
        </div>
      </div>

      {/* Categorical Data Grid Table Summary Details */}
      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs sm:p-5">
        <h3 className="mb-4 text-base font-bold text-gray-900">
          Budget Utilization Breakdown
        </h3>
        {/* Swipe overflow wrapper layout prevents squashing breakdown values */}
        <div className="overflow-x-auto pb-1">
          <table className="w-full min-w-150 border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                <th className="pb-3 font-semibold">Category Segment</th>
                <th className="pb-3 font-semibold">Allocated Cap</th>
                <th className="pb-3 font-semibold">Actual Spent</th>
                <th className="pb-3 font-semibold">Utilization Velocity</th>
                <th className="pb-3 text-right font-semibold">Status Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {categoryReportData.map((row) => {
                const percentage = (row.spent / row.allocated) * 100;
                const ratio = Math.min(percentage, 100);
                const status = getBudgetStatus(row.spent, row.allocated);
                const isOver = row.spent > row.allocated;

                return (
                  <tr
                    key={row.category}
                    className="transition hover:bg-gray-50/50"
                  >
                    <td className="py-3.5 font-medium text-gray-900">
                      {row.category}
                    </td>
                    <td className="py-3.5 text-gray-600">
                      ${row.allocated.toLocaleString()}
                    </td>
                    <td className="py-3.5 font-semibold text-gray-900">
                      ${row.spent.toLocaleString()}
                    </td>
                    <td className="w-44 py-3.5 pr-4 sm:w-48">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isOver ? "bg-red-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${ratio}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[status]}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
