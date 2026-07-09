import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import Settings from "../../pages/Settings.jsx";
import Others from "./sections/Others.jsx";
import Reports from "./sections/Reports.jsx";
import Scheduler from "./sections/Scheduler.jsx";
import Transactions from "./sections/Transactions.jsx";

const dashboardLinks = ["Transactions", "Scheduler", "Reports", "Others"];

const profilePictureUrl =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function FinanceTracker({
  currentSection,
  setCurrentSection,
  currentAccount,
}) {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return <Transactions selectedAccountId={currentAccount} />;
      case 1:
        return <Scheduler />;
      case 2:
        return <Reports />;
      case 3:
        return <Others />;
      case 4:
        return <Settings />;
      default:
        return <Transactions selectedAccountId={currentAccount} />;
    }
  };

  const handleLinkClick = (index) => {
    setCurrentSection(index);
    setIsSubMenuOpen(false); // Close mobile toggle state automatically
  };

  return (
    <section className="flex min-h-screen flex-1 flex-col gap-4 bg-gray-200/70 p-4 md:gap-6 md:p-6">
      {/* Top Header Block Wrapper Layout */}
      <div className="flex flex-col-reverse gap-3 md:h-15 md:flex-row md:items-center md:justify-between md:gap-2">
        {/* Left Navigation Block Links */}
        <div className="relative flex flex-col rounded-md bg-white/50 p-2 md:h-full md:flex-1 md:flex-row md:items-center md:gap-4 md:px-4 md:py-2 lg:gap-8">
          {/* Mobile Selector Header Bar */}
          <div className="flex items-center justify-between px-2 py-1 md:hidden">
            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Dashboard Sections
            </span>
            <button
              onClick={() => setIsSubMenuOpen((prev) => !prev)}
              className="rounded-md p-1.5 hover:bg-gray-200/50"
              aria-label="Toggle section navigation menu"
            >
              {isSubMenuOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Links Row Mapping Container */}
          <div
            role="tablist"
            aria-label="Dashboard sections"
            className={`${
              isSubMenuOpen ? "flex" : "hidden"
            } mt-2 flex-col gap-2 px-2 pb-2 md:mt-0 md:flex md:flex-row md:gap-4 md:p-0 lg:gap-8`}
          >
            {dashboardLinks.map((link, index) => {
              const isActive = currentSection === index;
              return (
                <button
                  key={link}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleLinkClick(index)}
                  className={`relative cursor-pointer py-1.5 text-left text-sm font-semibold transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-[width] after:duration-300 after:content-[''] hover:text-blue-600 hover:after:w-full md:py-0 ${
                    isActive
                      ? "text-blue-600 after:w-full"
                      : "text-gray-700 after:w-0"
                  }`}
                >
                  {link}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right User Profile Identifier Context */}
        <div className="flex h-12 items-center justify-between rounded-md bg-white/50 px-4 py-2 md:h-full md:min-w-16 md:shrink-0 md:justify-start md:gap-3">
          <div className="flex items-center gap-3">
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="h-8 w-8 rounded-full bg-gray-200 object-cover"
            />
            <p className="text-sm font-medium text-gray-800">
              Prayskey Ogbonna
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Conditionally rendered section body wrapper */}
      <div className="flex-1 rounded-xl bg-white/40 p-2 md:p-0">
        {renderSection()}
      </div>
    </section>
  );
}
