import { useState } from "react";
import {
  Target,
  Tag,
  ArrowLeftRight,
  Wallet,
  Plus,
  Trash2,
  ChevronDown,
} from "lucide-react";

const tabs = [
  { id: "goals", label: "Savings Goals", icon: Target },
  { id: "categories", label: "Spending Categories", icon: Tag },
  { id: "converter", label: "Currency Converter", icon: ArrowLeftRight },
  { id: "ledgers", label: "Connected Ledgers", icon: Wallet },
];

const initialGoals = [
  { id: 1, name: "Emergency Fund", target: 5000, current: 3200 },
  { id: 2, name: "New Laptop", target: 1800, current: 650 },
];

const initialCategories = [
  { id: 1, name: "Groceries", color: "bg-emerald-500" },
  { id: 2, name: "Transport", color: "bg-blue-500" },
  { id: 3, name: "Subscriptions", color: "bg-purple-500" },
];

const CATEGORY_COLORS = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-purple-500",
  "bg-amber-500",
  "bg-red-500",
  "bg-pink-500",
];

// TODO: replace with live FX rates from an API. Static and USD-based for now.
const MOCK_RATES = { USD: 1, EUR: 0.92, GBP: 0.78, NGN: 1530 };

const formatCurrency = (value) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function Others() {
  const [activeTab, setActiveTab] = useState("goals");

  // --- Savings Goals ---
  const [goals, setGoals] = useState(initialGoals);
  const [newGoal, setNewGoal] = useState({ name: "", target: "" });

  const addGoal = () => {
    const target = parseFloat(newGoal.target);
    if (!newGoal.name.trim() || !target || target <= 0) return;
    setGoals((prev) => [
      ...prev,
      { id: Date.now(), name: newGoal.name.trim(), target, current: 0 },
    ]);
    setNewGoal({ name: "", target: "" });
  };

  const removeGoal = (id) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  // --- Spending Categories ---
  const [categories, setCategories] = useState(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState("");

  const addCategory = () => {
    if (!newCategoryName.trim()) return;
    const color = CATEGORY_COLORS[categories.length % CATEGORY_COLORS.length];
    setCategories((prev) => [
      ...prev,
      { id: Date.now(), name: newCategoryName.trim(), color },
    ]);
    setNewCategoryName("");
  };

  const removeCategory = (id) =>
    setCategories((prev) => prev.filter((c) => c.id !== id));

  // --- Currency Converter ---
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");

  const numericAmount = parseFloat(amount) || 0;
  const convertedAmount =
    (numericAmount / MOCK_RATES[fromCurrency]) * MOCK_RATES[toCurrency];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 xl:col-span-3">
          {/* Mobile Tab Dropdown Selector */}
          <div className="relative sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-3.5 right-3 h-4 w-4 text-gray-400" />
          </div>

          {/* Tablet Horizontal Scroll / Desktop Sidebar navigation */}
          <div className="hidden gap-1 overflow-x-auto rounded-2xl border border-gray-200/80 bg-white p-3 whitespace-nowrap shadow-xs sm:flex lg:flex-col lg:overflow-x-visible lg:whitespace-normal">
            <h3 className="mb-2 hidden px-3 text-xs font-bold tracking-wider text-gray-400 uppercase lg:block">
              Tools & Extras
            </h3>
            <div className="flex w-full flex-row gap-1.5 lg:flex-col">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 font-semibold text-blue-700 shadow-2xs"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`}
                    />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs sm:p-8">
            {/* --- Savings Goals --- */}
            {activeTab === "goals" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    Savings Goals
                  </h4>
                  <p className="text-sm text-gray-500">
                    Track progress toward specific savings targets.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {goals.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No savings goals yet.
                    </p>
                  ) : (
                    goals.map((goal) => {
                      const pct = Math.min(
                        (goal.current / goal.target) * 100,
                        100,
                      );
                      return (
                        <div
                          key={goal.id}
                          className="rounded-xl border border-gray-100 bg-gray-50/50 p-4"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {goal.name}
                              </p>
                              <p className="mt-0.5 text-xs text-gray-500">
                                {formatCurrency(goal.current)} of{" "}
                                {formatCurrency(goal.target)}
                              </p>
                            </div>
                            <button
                              onClick={() => removeGoal(goal.id)}
                              aria-label={`Remove ${goal.name} goal`}
                              className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-blue-600 transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="mt-1 text-right text-xs font-medium text-gray-400">
                            {Math.round(pct)}%
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="flex flex-col gap-2 border-t border-gray-100 pt-4 sm:flex-row">
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) =>
                      setNewGoal((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Goal name"
                    className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                  <input
                    type="number"
                    min="0"
                    value={newGoal.target}
                    onChange={(e) =>
                      setNewGoal((prev) => ({
                        ...prev,
                        target: e.target.value,
                      }))
                    }
                    placeholder="Target amount"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:w-40"
                  />
                  <button
                    onClick={addGoal}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
              </div>
            )}

            {/* --- Spending Categories --- */}
            {activeTab === "categories" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    Spending Categories
                  </h4>
                  <p className="text-sm text-gray-500">
                    Custom categories used to tag and group your transactions.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {categories.length === 0 ? (
                    <p className="text-sm text-gray-500">No categories yet.</p>
                  ) : (
                    categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/50 py-1.5 pr-2 pl-3"
                      >
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${cat.color}`}
                        />
                        <span className="text-sm font-medium text-gray-700">
                          {cat.name}
                        </span>
                        <button
                          onClick={() => removeCategory(cat.id)}
                          aria-label={`Remove ${cat.name} category`}
                          className="rounded-full p-0.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCategory()}
                    placeholder="New category name"
                    className="flex-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                  />
                  <button
                    onClick={addCategory}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
              </div>
            )}

            {/* --- Currency Converter --- */}
            {activeTab === "converter" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    Currency Converter
                  </h4>
                  <p className="text-sm text-gray-500">
                    Quick conversions using indicative exchange rates.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto_1fr]">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase">
                      From
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      />
                      <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="rounded-xl border border-gray-200 px-2 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      >
                        {Object.keys(MOCK_RATES).map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFromCurrency(toCurrency);
                      setToCurrency(fromCurrency);
                    }}
                    aria-label="Swap currencies"
                    className="mt-6 flex h-10 w-10 items-center justify-center justify-self-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </button>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold tracking-wider text-gray-500 uppercase">
                      To
                    </label>
                    <div className="flex gap-2">
                      <div className="flex w-full items-center rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5 text-sm font-semibold text-gray-900">
                        {convertedAmount.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="rounded-xl border border-gray-200 px-2 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                      >
                        {Object.keys(MOCK_RATES).map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  Rates are indicative and not updated in real time.
                </p>
              </div>
            )}

            {/* --- Connected Ledgers --- */}
            {activeTab === "ledgers" && (
              <div className="space-y-4 py-6 text-center">
                <Wallet className="mx-auto h-10 w-10 text-gray-300" />
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    Connected Ledgers
                  </h4>
                  <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                    No external financial ledger integrations are configured
                    yet.
                  </p>
                </div>
                <button
                  // TODO: launch actual ledger-connection flow (Plaid/Mono/etc.)
                  className="mx-auto flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" /> Connect New Ledger
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
