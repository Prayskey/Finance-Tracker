import { Clock } from "lucide-react";
import { useState } from "react";

const transactionData = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -150.0,
    date: "2026-07-14T14:30:00",
    paymentMethod: "Credit Card",
    currentBalance: 500.0,
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    description: "Electricity Bill",
    amount: -75.5,
    date: "2026-07-14T12:15:00",
    paymentMethod: "Bank Transfer",
    currentBalance: 425.0,
    image:
      "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    description: "Restaurant Dinner",
    amount: -60.0,
    date: "2026-07-14T09:23:00",
    paymentMethod: "Cash",
    currentBalance: 365.0,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    description: "Beverages",
    amount: -30.0,
    date: "2026-07-14T09:00:00",
    paymentMethod: "Bank Transfer",
    currentBalance: 335.0,
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    description: "Forex",
    amount: 100.14,
    date: "2026-07-14T08:30:00",
    paymentMethod: "Bank Transfer",
    currentBalance: 435.14,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXh8ZW58MHx8MHx8fDA%3D",
  },
];

const accountIdToPaymentMethod = {
  1: "Cash",
  2: "Credit Card",
  3: "Bills",
  4: "Business",
};

const formatCurrency = (value) =>
  Math.abs(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default function Transactions({ selectedAccountId = null }) {
  const [activeId, setActiveId] = useState(null);

  const toggleDropdown = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  const filteredData = selectedAccountId
    ? transactionData.filter(
        (t) => t.paymentMethod === accountIdToPaymentMethod[selectedAccountId],
      )
    : transactionData;

  return (
    <div className="mt-2 flex flex-col md:mt-4">
      <div className="flex flex-col gap-2 rounded-md bg-white/70 p-2 md:p-3">
        <div className="space-y-0.5">
          <div className="flex h-8 items-center text-lg font-bold text-gray-950 border-b border-b-gray-300">
            <span className="font-medium text-gray-400 text-xs">TODAY</span>
          </div>
          <div className="flex flex-col gap-1">
            {filteredData.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">
                No transactions found for this account.
              </p>
            ) : (
              filteredData.map((data) => {
                const isExpense = data.amount < 0;
                const isOpen = activeId === data.id;
                const panelId = `transaction-panel-${data.id}`;

                const formattedTime = new Date(data.date).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  },
                );

                return (
                  <div
                    key={data.id}
                    className="overflow-hidden rounded-md bg-white shadow-xs transition-all duration-200"
                  >
                    {/* Master Button Component Wrapper: Shifts from list-card layout to tabular rows dynamically */}
                    <button
                      onClick={() => toggleDropdown(data.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="flex w-full cursor-pointer flex-col gap-3 p-4 text-left transition hover:bg-gray-50/80 md:grid md:grid-cols-12 md:items-center md:gap-2 md:p-3.5"
                    >
                      {/* Column 1: Details Block Layout */}
                      <div className="flex w-full min-w-0 items-center gap-3 md:col-span-5">
                        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
                          <img
                            className="h-full w-full object-cover"
                            src={data.image}
                            alt={data.description}
                          />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col text-left">
                          <p className="truncate leading-tight font-semibold text-gray-900">
                            {data.description}
                          </p>
                          <p className="mt-0.5 truncate text-xs font-medium text-gray-400">
                            {data.paymentMethod}
                          </p>
                        </div>
                        {/* Mobile Badge: Visual display helper indicator for Date values */}
                        <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400 md:hidden">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formattedTime}</span>
                        </span>
                      </div>

                      {/* Mobile Breakpoint Horizontal Row Divider */}
                      <div className="h-px w-full bg-gray-100 md:hidden" />

                      {/* Pricing, Metric, and Balance Container Box */}
                      <div className="flex w-full items-center justify-between md:col-span-7 md:grid md:grid-cols-7 md:gap-2">
                        {/* Column 2: Amount (3 Columns on Desktop) */}
                        <div className="flex items-center md:col-span-3">
                          <span
                            className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold tracking-wide whitespace-nowrap ${
                              isExpense
                                ? "bg-red-50 text-red-700"
                                : "bg-green-50 text-green-700"
                            }`}
                          >
                            {isExpense ? "-" : "+"}
                            {formatCurrency(data.amount)}
                          </span>
                        </div>

                        {/* Column 3: Date (2 Columns on Desktop - Hidden on mobile context row) */}
                        <div className="hidden text-xs font-semibold whitespace-nowrap text-gray-500 md:col-span-2 md:flex md:items-center md:gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formattedTime}</span>
                        </div>

                        {/* Column 4: Balance Metric Label View */}
                        <div className="text-right text-xs font-bold whitespace-nowrap text-gray-900 md:col-span-2 md:pr-1">
                          <span className="mr-1 font-medium text-gray-400 md:hidden">
                            Bal:
                          </span>
                          {data.currentBalance.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                      </div>
                    </button>

                    {/* Dropdown Panel Content */}
                    <div
                      id={panelId}
                      className="grid border-t border-gray-100 bg-gray-50/50 text-xs text-gray-600 transition-all duration-100 ease-in-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div
                        className="min-h-0 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                          paddingTop: isOpen ? "1rem" : "0px",
                          paddingBottom: isOpen ? "1rem" : "0px",
                          paddingLeft: "1rem",
                          paddingRight: "1rem",
                        }}
                      >
                        <p className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                          Metadata Parameters
                        </p>
                        <div className="mt-2 grid grid-cols-1 gap-2 font-medium text-gray-700 sm:grid-cols-2">
                          <div>
                            Transaction hash ID:{" "}
                            <span className="font-mono text-gray-900">
                              #TX-00{data.id}
                            </span>
                          </div>
                          <div>
                            Status:{" "}
                            <span className="font-bold text-emerald-600">
                              Settled Ledger
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
