import { ChevronDown, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import briefCase from "../../assets/briefcase.png";
import creditCard from "../../assets/credit-card.png";
import bills from "../../assets/invoice.png";
import masterCard from "../../assets/mastercard-removebg-preview.png";
import cash from "../../assets/money.png";

const accountType = [
  { id: 1, title: "Cash", balance: 1023, logo: cash },
  { id: 2, title: "Credit Card", balance: 244, logo: creditCard },
  { id: 3, title: "Bills", balance: 421, logo: bills },
  { id: 4, title: "Business", balance: 3154, logo: briefCase },
];

export default function Navbar({
  currentSection,
  setCurrentSection,
  currentAccount,
  setCurrentAccount,
}) {
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMainBankClick = () => {
    setIsBankDropdownOpen(!isBankDropdownOpen);
    setCurrentAccount(null);
  };

  const handleAccountSelect = (id) => {
    setCurrentAccount(id);
    setIsMobileMenuOpen(false); // Auto-close menu on mobile selection
  };

  const handleSettingsClick = () => {
    setCurrentSection(3);
    setIsMobileMenuOpen(false); // Auto-close menu on mobile selection
  };

  return (
    <section className="flex w-full flex-col border-b border-gray-200 bg-gray-50 p-4 md:min-h-screen md:w-64 md:justify-between md:border-b-0 md:border-r md:p-5">
      {/* Mobile Top Header Bar */}
      <div className="flex items-center justify-between md:block">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 md:mb-8 md:text-2xl">
          Finance Tracker
        </h2>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="rounded-lg p-2 hover:bg-gray-200 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Navigation Body: Expandable on mobile, always visible on desktop */}
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} mt-4 transition-all md:mt-0 md:block md:flex-1`}>
        <p className="py-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          Accounts
        </p>

        {/* Main Account Dropdown */}
        <div className="relative mb-6">
          <button
            onClick={handleMainBankClick}
            className={`mt-2 flex w-full cursor-pointer items-center justify-between rounded-xl p-3 shadow-xs transition-all duration-200 active:scale-[0.99] ${
              currentAccount === null
                ? "border border-gray-200/80 bg-white shadow-md"
                : "bg-gray-200/80 hover:bg-gray-200"
            }`}
            aria-label="United Bank Account"
            aria-expanded={isBankDropdownOpen}
          >
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-8 w-12 items-center justify-center rounded-md border border-gray-300/40 bg-white/60 p-1">
                <img className="h-full w-full object-contain" src={masterCard} alt="MasterCard" />
              </div>
              <div>
                <p className="text-sm leading-tight font-semibold text-gray-900">United Bank</p>
                <p className="mt-0.5 text-xs leading-tight font-medium text-gray-500">$1,729.23</p>
              </div>
            </div>
            <div className="flex items-center justify-center text-gray-500">
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isBankDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Conditional Dropdown Overlay */}
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

        {/* Sub-Accounts List */}
        <div className="flex flex-col gap-1">
          {accountType.map((account) => {
            const isSelected = currentAccount === account.id;
            return (
              <button
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left transition-all duration-200 ${
                  isSelected
                    ? "scale-[1.01] border border-gray-200/80 bg-white shadow-xs"
                    : "border border-transparent hover:bg-gray-200/60 active:bg-gray-200"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200/60 bg-white p-2 shadow-xs">
                  <img src={account.logo} alt={account.title} className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className={`text-sm leading-tight font-semibold ${isSelected ? "text-blue-600" : "text-gray-700"}`}>
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

      {/* Settings Action Component */}
      <button
        onClick={handleSettingsClick}
        className={`mt-4 flex w-full cursor-pointer items-center gap-3 rounded-xl p-2.5 text-left font-medium transition-all duration-200 active:bg-gray-200 md:mt-auto ${
          isMobileMenuOpen ? "flex" : "hidden md:flex"
        } ${
          currentSection === 3
            ? "border border-gray-200/80 bg-white text-blue-600 shadow-xs"
            : "text-gray-500 hover:bg-gray-200/60 hover:text-gray-900"
        }`}
      >
        <Settings className={`h-5 w-5 ${currentSection === 3 ? "text-blue-600" : "text-gray-400"}`} />
        <p className="text-sm font-semibold">Settings</p>
      </button>
    </section>
  );
}
