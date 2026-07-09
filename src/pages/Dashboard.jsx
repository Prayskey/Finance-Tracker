import { useState } from "react";
import FinanceTracker from "../components/Dashboard/FinanceTracker";
import Navbar from "../components/Dashboard/Navbar";

export default function Dashboard() {
  // Tracks Active Tab Index
  const [currentSection, setCurrentSection] = useState(0);
  // Tracks Selected Account ID
  const [currentAccount, setCurrentAccount] = useState(null);

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-gray-100/50 text-sm text-gray-900 antialiased md:h-screen md:flex-row md:overflow-hidden">
      {/* Sidebar navigation component handles mobile top-bar swap natively */}
      <Navbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      {/* Main Content Workspace viewport wrapper container */}
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
