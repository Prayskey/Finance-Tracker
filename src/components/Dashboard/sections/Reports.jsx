import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Download,
  Calendar,
} from "lucide-react";

// Mock financial report breakdown metrics
const categoryReportData = [
  {
    category: "Housing & Rent",
    allocated: 1500,
    spent: 1200,
    status: "Under Budget",
  },
  {
    category: "Groceries & Food",
    allocated: 400,
    spent: 480,
    status: "Over Budget",
  },
  {
    category: "Utilities & Bills",
    allocated: 300,
    spent: 260,
    status: "Under Budget",
  },
  {
    category: "Entertainment & Leisure",
    allocated: 200,
    spent: 195,
    status: "Under Budget",
  },
  {
    category: "Investments & Savings",
    allocated: 500,
    spent: 500,
    status: "On Track",
  },
];

export default function Reports() {
  const [reportTimeframe, setReportTimeframe] = useState("This Month");

  return (
    <div className="flex flex-col gap-6">
      {/* Header Controls Block */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Financial Reports</h2>
          <p className="text-sm text-gray-500">
            Analyze your spending habits, statements, and budgetary allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mock Timeframe Selector Dropdown */}
          <div className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-xs">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{reportTimeframe}</span>
          </div>

          <button className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800">
            <Download className="h-4 w-4" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Summary Delta Indicators Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Net Cash Flow Balance */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Net Cash Flow
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700">
              <TrendingUp className="h-3 w-3" /> +12.4%
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">$2,450.80</p>
          <p className="mt-1 text-xs text-gray-400">
            vs last consecutive month window
          </p>
        </div>

        {/* Expense Trajectory Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Total Burn Outflow
            </span>
            <span className="inline-flex items-center gap-0.5 rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700">
              <TrendingDown className="h-3 w-3" /> -4.1%
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">$2,630.00</p>
          <p className="mt-1 text-xs text-gray-400">
            Total strict expenditures counted
          </p>
        </div>

        {/* Savings Efficiency Score */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Budget Accuracy Rate
            </span>
            <span className="text-blue-600">
              <BarChart3 className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">92.5%</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600"
              style={{ width: "92.5%" }}
            />
          </div>
        </div>
      </div>

      {/* Categorical Budget Tracking Grid Details */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
        <h3 className="mb-4 text-base font-bold text-gray-900">
          Budget Utilization Breakdown
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
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
              {categoryReportData.map((row, idx) => {
                const ratio = Math.min((row.spent / row.allocated) * 100, 100);
                const isOver = row.spent > row.allocated;

                return (
                  <tr key={idx} className="transition hover:bg-gray-50/50">
                    <td className="py-3.5 font-medium text-gray-900">
                      {row.category}
                    </td>
                    <td className="py-3.5 text-gray-600">
                      ${row.allocated.toLocaleString()}
                    </td>
                    <td className="py-3.5 font-semibold text-gray-900">
                      ${row.spent.toLocaleString()}
                    </td>
                    <td className="w-48 py-3.5 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${isOver ? "bg-red-500" : "bg-emerald-500"}`}
                            style={{ width: `${ratio}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          {Math.round((row.spent / row.allocated) * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${row.status === "Over Budget" ? "bg-red-100 text-red-700" : ""} ${row.status === "Under Budget" ? "bg-green-100 text-green-700" : ""} ${row.status === "On Track" ? "bg-gray-100 text-gray-700" : ""} `}
                      >
                        {row.status}
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
