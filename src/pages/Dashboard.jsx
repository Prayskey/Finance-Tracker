import { useState } from "react";
import FinanceTracker from "../components/Dashboard/FinanceTracker";
import Navbar from "../components/Dashboard/Navbar";

export default function Dashboard() {
  // Active tab index
  const [currentSection, setCurrentSection] = useState(0);
  // Selected account ID
  const [currentAccount, setCurrentAccount] = useState(null);

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-gray-100/50 text-sm text-gray-900 antialiased md:h-screen md:flex-row md:overflow-hidden">
      {/* Sidebar nav; swaps to top bar on mobile internally */}
      <Navbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      {/* Main content viewport */}
      <main className="flex h-auto min-w-0 flex-1 flex-col md:h-full md:overflow-y-auto">
        <FinanceTracker
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          currentAccount={currentAccount}
        />
      </main>
    </div>
  );
}
