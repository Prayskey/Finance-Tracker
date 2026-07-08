import { ChevronDown } from "lucide-react";
import Others from "./sections/Others.jsx";
import Reports from "./sections/Reports.jsx";
import Scheduler from "./sections/Scheduler.jsx";
import Transactions from "./sections/Transactions.jsx";

const dashboardLinks = ["Transactions", "Scheduler", "Reports", "Others"];

const profilePictureUrl =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1143&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Accept lifted properties as parameters
export default function FinanceTracker({
  currentSection,
  setCurrentSection,
  currentAccount,
}) {
  // Render the correct view based on the current active navigation index
  const renderSection = () => {
    switch (currentSection) {
      case 0:
        // Pass the account filter prop directly down into Transactions list
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

  return (
    <section className="flex min-h-screen flex-1 flex-col gap-6 bg-gray-200/70 p-6">
      {/* Top Header Block */}
      <div className="flex h-15 items-center justify-between gap-2">
        {/* Left Navigation Links */}
        <div className="flex h-full flex-1 items-center gap-4 rounded-md bg-white/50 px-4 py-2 md:gap-6 lg:gap-8">
          {dashboardLinks.map((link, index) => {
            const isActive = currentSection === index;
            return (
              <a
                key={link}
                onClick={() => setCurrentSection(index)}
                className={`relative cursor-pointer text-sm font-semibold transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-[width] after:duration-300 after:content-[''] hover:text-blue-600 hover:after:w-full ${isActive ? "text-blue-600 after:w-full" : "text-gray-700 after:w-0"}`}
              >
                {link}
              </a>
            );
          })}
        </div>

        {/* Right User Profile */}
        <div className="flex h-full min-w-16 shrink-0 items-center gap-3 rounded-md bg-white/50 px-4 py-2">
          <img
            src={profilePictureUrl}
            alt="Profile Picture"
            className="h-8 w-8 rounded-full bg-gray-200 object-cover"
          />
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-gray-800">
              Prayskey Ogbonna
            </p>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Conditionally rendered section body wrapper */}
      <div className="flex-1">{renderSection()}</div>
    </section>
  );
}
