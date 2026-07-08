import { ChevronDown } from "lucide-react"; // Imported for visual anchor on toggle
import { useState } from "react";

const transactionData = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: -150.0,
    date: "2023-10-15",
    paymentMethod: "Credit Card",
    currentBalance: 500.0,
    image:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    description: "Electricity Bill",
    amount: -75.5,
    date: "2023-10-12",
    paymentMethod: "Bank Transfer",
    currentBalance: 425.0,
    image:
      "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    description: "Restaurant Dinner",
    amount: -60.0,
    date: "2023-10-10",
    paymentMethod: "Cash",
    currentBalance: 365.0,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    description: "Beverages",
    amount: -30.0,
    date: "2023-10-10",
    paymentMethod: "Bank Transfer",
    currentBalance: 335.0,
    image:
      "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dss",
  },
  {
    id: 5,
    description: "Forex",
    amount: 100.14,
    date: "2023-10-10",
    paymentMethod: "Bank Transfer",
    currentBalance: 435.14,
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXh8ZW58MHx8MHx8fDA%3D",
  },
];

export default function Transactions() {
  const [activeId, setActiveId] = useState(null);
  const toggleDropdown = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="mt-4 flex flex-col">
      <div className="flex flex-col gap-2 rounded-2xl bg-white/70 p-4">
        <div>
          <div className="flex h-12 items-center text-lg font-bold text-gray-950">
            Today
          </div>

          {/* Table Header Row */}
          <div className="grid w-full grid-cols-12 px-3 py-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            <div className="col-span-5">Details</div>
            <div className="col-span-3">Amount</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Balance</div>
          </div>

          {/* Transaction Rows Container */}
<div className="flex flex-col gap-2">
  {transactionData.map((data) => {
    const isExpense = data.amount < 0;
    const isOpen = activeId === data.id;

    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return (
      <div key={data.id} className="overflow-hidden rounded-xl bg-white shadow-xs transition-all duration-200">

        {/* Clickable Master Header Row - Locked directly to 12-column matrix bounds */}
        <button
          onClick={() => toggleDropdown(data.id)}
          className="grid w-full cursor-pointer grid-cols-12 items-center gap-2 p-3.5 text-left transition hover:bg-gray-50/80"
        >
          {/* Column 1: Details (5 Columns) */}
          <div className="col-span-5 flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0 rounded-full border border-gray-100 bg-gray-50 overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={data.image}
                alt={data.description}
              />
            </div>
            <div className="flex flex-col text-left min-w-0">
              <p className="leading-tight font-semibold text-gray-900 truncate">
                {data.description}
              </p>
              <p className="mt-0.5 text-xs text-gray-400 font-medium truncate">
                {data.paymentMethod}
              </p>
            </div>
          </div>

          {/* Column 2: Amount (3 Columns) - Explicit grid alignment blocks text overlapping */}
          <div className="col-span-3 flex items-center">
            <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold tracking-wide whitespace-nowrap
              ${isExpense ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
            >
              {isExpense ? "-" : "+"}
              {Math.abs(data.amount).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </div>

          {/* Column 3: Date (2 Columns) - Locked text bounds */}
          <div className="col-span-2 text-xs font-semibold text-gray-500 whitespace-nowrap">
            {formattedDate}
          </div>

          {/* Column 4: Balance (2 Columns) - Right Aligned cleanly */}
          <div className="col-span-2 text-right text-xs font-bold text-gray-900 whitespace-nowrap pr-1">
            {data.currentBalance.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </div>
        </button>

        {/* Dropdown Panel Content */}
        {isOpen && (
          <div className="border-t border-gray-100 bg-gray-50/50 p-4 text-xs text-gray-600 animate-fadeIn">
            <p className="font-semibold text-gray-400 uppercase tracking-wider text-[10px]">Metadata Parameters</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-gray-700 font-medium">
              <div>Transaction hash ID: <span className="font-mono text-gray-900">#TX-00{data.id}</span></div>
              <div>Status: <span className="text-emerald-600 font-bold">Settled Ledger</span></div>
            </div>
          </div>
        )}

      </div>
    );
  })}
</div>

        </div>
      </div>
    </div>
  );
}
