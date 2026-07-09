import { useState } from "react";
import { User, Bell, Shield, Save, RefreshCw, ChevronDown } from "lucide-react";
import Navbar from "../components/Dashboard/Navbar";

const DEFAULT_SETTINGS = {
  profileName: "Prayskey Ogbonna",
  currency: "USD",
  emailAlerts: true,
  pushAlerts: false,
  twoFactor: true,
};

const tabs = [
  { id: "account", label: "Account Configuration", icon: User },
  { id: "notifications", label: "Notification Channels", icon: Bell },
  { id: "security", label: "System Protocols", icon: Shield },
];

export default function Settings() {
  // Account selector in the sidebar is still functional here for nav
  // consistency, even though it has no bearing on settings content.
  const [currentAccount, setCurrentAccount] = useState(null);

  const [activeTab, setActiveTab] = useState("account");

  // Last-saved snapshot vs. in-progress draft, so Save/Revert have
  // something real to act on. TODO: replace with actual persistence
  // (API call) once a settings backend exists.
  const [savedSettings, setSavedSettings] = useState(DEFAULT_SETTINGS);
  const [draft, setDraft] = useState(DEFAULT_SETTINGS);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(savedSettings);

  const updateDraft = (patch) => setDraft((prev) => ({ ...prev, ...patch }));

  const handleSave = () => {
    setSavedSettings(draft);
    // TODO: persist to backend here
  };

  const handleRevert = () => setDraft(savedSettings);

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-gray-100/50 text-sm text-gray-900 antialiased md:h-screen md:flex-row md:overflow-hidden">
      <Navbar
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />

      <main className="flex h-auto min-w-0 flex-1 flex-col md:h-full md:overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-4 xl:col-span-3">
              {/* Mobile Tab Dropdown Selector */}
              <div className="relative sm:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-700 shadow-xs focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-3.5 right-3 h-4 w-4 text-gray-400" />
              </div>

              {/* Tablet Horizontal Scroll / Desktop Sidebar navigation */}
              <div className="hidden gap-1 overflow-x-auto rounded-2xl border border-gray-200/80 bg-white p-3 whitespace-nowrap shadow-xs sm:flex lg:flex-col lg:overflow-x-visible lg:whitespace-normal">
                <h3 className="mb-2 hidden px-3 text-xs font-bold tracking-wider text-gray-400 uppercase lg:block">
                  Settings
                </h3>
                <div className="flex w-full flex-row gap-1.5 lg:flex-col">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 font-semibold text-blue-700 shadow-2xs"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`}
                        />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="rounded-2xl border border-gray-200/80 bg-white shadow-xs transition-all">
                <div className="space-y-8 p-6 sm:p-8">
                  {activeTab === "account" && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Profile Settings
                        </h4>
                        <p className="text-sm text-gray-500">
                          Update your account identity and system preferences.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <label
                            htmlFor="profileName"
                            className="block text-xs font-bold tracking-wider text-gray-500 uppercase"
                          >
                            Display Name
                          </label>
                          <input
                            id="profileName"
                            type="text"
                            value={draft.profileName}
                            onChange={(e) =>
                              updateDraft({ profileName: e.target.value })
                            }
                            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 placeholder-gray-400 shadow-2xs transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                            placeholder="Enter display name"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label
                            htmlFor="currency"
                            className="block text-xs font-bold tracking-wider text-gray-500 uppercase"
                          >
                            Workspace Currency
                          </label>
                          <select
                            id="currency"
                            value={draft.currency}
                            onChange={(e) =>
                              updateDraft({ currency: e.target.value })
                            }
                            className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-2xs transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                          >
                            <option value="USD">
                              United States Dollar ($)
                            </option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">British Pound (£)</option>
                            <option value="NGN">Nigerian Naira (₦)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "notifications" && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Notification Channels
                        </h4>
                        <p className="text-sm text-gray-500">
                          Manage how and when you receive important updates.
                        </p>
                      </div>

                      <div className="divide-y divide-gray-100">
                        <div className="flex items-center justify-between py-4 first:pt-0">
                          <div className="pr-4">
                            <p className="text-sm font-semibold text-gray-900">
                              Email Balance Statements
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              Receive weekly digests detailing outlays and
                              earnings.
                            </p>
                          </div>
                          <button
                            role="switch"
                            aria-checked={draft.emailAlerts}
                            onClick={() =>
                              updateDraft({ emailAlerts: !draft.emailAlerts })
                            }
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${draft.emailAlerts ? "bg-blue-600" : "bg-gray-200"}`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${draft.emailAlerts ? "translate-x-5" : "translate-x-0"}`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between py-4">
                          <div className="pr-4">
                            <p className="text-sm font-semibold text-gray-900">
                              Push Notifications
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              Receive immediate pings when automated transfers
                              trigger.
                            </p>
                          </div>
                          <button
                            role="switch"
                            aria-checked={draft.pushAlerts}
                            onClick={() =>
                              updateDraft({ pushAlerts: !draft.pushAlerts })
                            }
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${draft.pushAlerts ? "bg-blue-600" : "bg-gray-200"}`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${draft.pushAlerts ? "translate-x-5" : "translate-x-0"}`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-base font-semibold text-gray-900">
                          Security Protocols
                        </h4>
                        <p className="text-sm text-gray-500">
                          Enhance your digital account parameters and
                          authorization rules.
                        </p>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <div className="pr-4">
                          <p className="text-sm font-semibold text-gray-900">
                            Two-Factor Authentication (2FA)
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            Secure transactions with secondary authentication
                            codes.
                          </p>
                        </div>
                        <button
                          role="switch"
                          aria-checked={draft.twoFactor}
                          onClick={() =>
                            updateDraft({ twoFactor: !draft.twoFactor })
                          }
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-blue-500/20 focus:outline-none ${draft.twoFactor ? "bg-blue-600" : "bg-gray-200"}`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${draft.twoFactor ? "translate-x-5" : "translate-x-0"}`}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sticky Action Footer Row */}
                <div className="flex items-center justify-end gap-3 rounded-b-2xl border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                  <button
                    onClick={handleRevert}
                    disabled={!isDirty}
                    className="shadow-3xs flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 focus:ring-2 focus:ring-gray-100 focus:outline-none active:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <RefreshCw className="h-4 w-4 text-gray-400" /> Revert
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!isDirty}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/20 focus:outline-none active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save className="h-4 w-4" /> Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
