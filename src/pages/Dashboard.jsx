import { useState } from "react";
import FinanceTracker from "../components/Dashboard/FinanceTracker";
import Navbar from "../components/Dashboard/Navbar";

export default function Dashboard() {
  // 1. Lift state up to manage global dashboard selections
  const [currentSection, setCurrentSection] = useState(0); // Tracks Active Tab Index
  const [currentAccount, setCurrentAccount] = useState(null); // Tracks Selected Account ID

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100/50 text-sm text-gray-900 antialiased">
      {/* 2. Pass state handlers and values into Sidebar */}
      <Navbar
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      {/* Main Content Workspace */}
      <main className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto">
        {/* 3. Pass states down into Workspace to automatically filter list view displays */}
        <FinanceTracker
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          currentAccount={currentAccount}
        />
      </main>
    </div>
  );
}
