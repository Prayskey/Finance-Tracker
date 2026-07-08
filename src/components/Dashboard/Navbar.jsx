import { ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import briefCase from "../../assets/briefcase.png";
import creditCard from "../../assets/credit-card.png";
import bills from "../../assets/invoice.png";
import masterCard from "../../assets/mastercard-removebg-preview.png";
import cash from "../../assets/money.png";

const accountType = [
  {
    id: 1,
    title: "Cash",
    balance: 1023,
    logo: cash,
  },
  {
    id: 2,
    title: "Credit Card",
    balance: 244,
    logo: creditCard,
  },
  {
    id: 3,
    title: "Bills",
    balance: 421,
    logo: bills,
  },
  {
    id: 4,
    title: "Business",
    balance: 3154,
    logo: briefCase,
  },
];

// Receive the global tracker layout handlers directly
export default function Navbar({
  currentSection,
  setCurrentSection,
  currentAccount,
  setCurrentAccount,
}) {
  // Local toggle configuration belongs strictly on this element
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);

  // Clear sub-selection highlight when focusing back on the main card option
  const handleMainBankClick = () => {
    setIsBankDropdownOpen(!isBankDropdownOpen);
    setCurrentAccount(null);
  };

  return (
    <section className="flex min-h-screen w-1/3 flex-col justify-between border-r border-gray-200 bg-gray-50 p-5 md:w-1/4">
      <div>
        <h2 className="mb-8 text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
          Finance Tracker
        </h2>

        <p className="py-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Accounts
        </p>

        {/* Main Account Dropdown Menu Block Wrapper */}
        <div className="relative mb-6">
          <button
            onClick={handleMainBankClick}
            className={`mt-2 flex w-full cursor-pointer items-center justify-between rounded-xl p-3 shadow-xs transition-all duration-200 active:scale-[0.99] ${currentAccount === null ? "border border-gray-200/80 bg-white shadow-md" : "bg-gray-200/80 hover:bg-gray-200"}`}
            aria-label="United Bank Account"
            aria-expanded={isBankDropdownOpen}
          >
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-8 w-12 items-center justify-center rounded-md border border-gray-300/40 bg-white/60 p-1">
                <img
                  className="h-full w-full object-contain"
                  src={masterCard}
                  alt="MasterCard"
                />
              </div>
              <div>
                <p className="text-sm leading-tight font-semibold text-gray-900">
                  United Bank
                </p>
                <p className="mt-0.5 text-xs leading-tight font-medium text-gray-500">
                  $1,729.23
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center text-gray-500">
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${isBankDropdownOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>

          {/* Conditional Dropdown Overlay List */}
          {isBankDropdownOpen && (
            <div className="animate-fadeIn absolute top-full left-0 z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg">
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50">
                View Account Statements
              </button>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-gray-700 hover:bg-gray-50">
                Manage Linked Cards
              </button>
            </div>
          )}
        </div>

        {/* Mapped Sub-Accounts List */}
        <div className="flex flex-col gap-1">
          {accountType.map((account) => {
            const isSelected = currentAccount === account.id;

            return (
              <button
                key={account.id}
                onClick={() => setCurrentAccount(account.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200 ${
                  isSelected
                    ? "scale-[1.01] border border-gray-200/80 bg-white shadow-xs"
                    : "border border-transparent hover:bg-gray-200/60 active:bg-gray-200"
                }`}
              >
                {/* Visual Icon Container */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200/60 bg-white p-2 shadow-xs">
                  <img
                    src={account.logo}
                    alt={account.title}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Account Label Details */}
                <div>
                  <p
                    className={`text-sm leading-tight font-semibold ${isSelected ? "text-blue-600" : "text-gray-700"}`}
                  >
                    {account.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-tight font-medium text-gray-500">
                    {account.balance.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Action: Routes view straight over to index 3 ('Others') */}
      <button
        onClick={() => setCurrentSection(3)}
        className={`mt-auto flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left font-medium transition-all duration-200 active:bg-gray-200 ${currentSection === 3 ? "border border-gray-200/80 bg-white text-blue-600 shadow-xs" : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-900"}`}
      >
        <Settings
          className={`h-5 w-5 ${currentSection === 3 ? "text-blue-600" : "text-gray-400"}`}
        />
        <p className="text-sm font-semibold">Settings</p>
      </button>
    </section>
  );
}
