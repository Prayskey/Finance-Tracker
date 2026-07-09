import { ChevronDown, LogOut, Menu, Settings as SettingsIcon, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    if (!isProfileMenuOpen) return;

    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileMenuOpen]);

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
      default:
        return <Transactions selectedAccountId={currentAccount} />;
    }
  };

  const handleLinkClick = (index) => {
    setCurrentSection(index);
    setIsSubMenuOpen(false); // Close mobile toggle state automatically
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    // TODO: clear auth session/token and redirect to /login once auth is wired up
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
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
            className="flex h-12 w-full items-center justify-between rounded-md bg-white/50 px-4 py-2 transition hover:bg-white/80 md:h-full md:min-w-16 md:shrink-0 md:justify-start md:gap-3"
          >
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
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                isProfileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileMenuOpen && (
            <div
              role="menu"
              className="animate-fadeIn absolute top-full right-0 z-20 mt-1 w-56 rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
            >
              <div className="border-b border-gray-100 px-3 py-2">
                <p className="text-sm font-semibold text-gray-900">
                  Prayskey Ogbonna
                </p>
                {/* TODO: replace with real user email once auth is wired up */}
                <p className="truncate text-xs text-gray-400">
                  prayskey@example.com
                </p>
              </div>

              <Link
                to="/settings"
                onClick={() => setIsProfileMenuOpen(false)}
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <User className="h-4 w-4 text-gray-400" />
                View Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setIsProfileMenuOpen(false)}
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <SettingsIcon className="h-4 w-4 text-gray-400" />
                Settings
              </Link>

              <button
                onClick={handleLogout}
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Conditionally rendered section body wrapper */}
      <div className="flex-1 rounded-xl bg-white/40 p-2 md:p-0">
        {renderSection()}
      </div>
    </section>
  );
}
