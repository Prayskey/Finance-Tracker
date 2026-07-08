import React, { useState } from "react";
import { User, Bell, Shield, Wallet, Save, RefreshCw } from "lucide-react";

export default function Others() {
  const [profileName, setProfileName] = useState("Prayskey Ogbonna");
  const [currency, setCurrency] = useState("USD");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Sidebar Menu Anchors */}
      <div className="flex h-fit flex-col gap-1 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
        <h3 className="mb-2 px-3 text-xs font-bold tracking-wider text-gray-400 uppercase">
          Hub Preferences
        </h3>

        <button className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-3 py-2.5 text-left text-sm font-semibold text-blue-700">
          <User className="h-4 w-4" /> Account Configuration
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <Bell className="h-4 w-4 text-gray-400" /> Notifications Channels
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <Shield className="h-4 w-4 text-gray-400" /> System Protocols
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          <Wallet className="h-4 w-4 text-gray-400" /> Connected Ledgers
        </button>
      </div>

      {/* Main Focus Panel Form Area */}
      <div className="flex flex-col gap-6 lg:col-span-2">
        {/* Module Form Wrapper */}
        <div className="flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
          {/* Identity Parameters */}
          <div>
            <h4 className="mb-3 text-sm font-bold tracking-wider text-gray-400 uppercase">
              Identity Matrix
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 shadow-2xs focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase">
                  Workspace Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-2xs focus:border-blue-500 focus:outline-none"
                >
                  <option value="USD">United States Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                  <option value="NGN">Nigerian Naira (₦)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Toggle Alert Configurations */}
          <div className="border-t border-gray-100 pt-5">
            <h4 className="mb-3 text-sm font-bold tracking-wider text-gray-400 uppercase">
              Notification Switches
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Email Balance Statements
                  </p>
                  <p className="text-xs text-gray-400">
                    Receive weekly digests detailing outlays and earnings.
                  </p>
                </div>
                <button
                  onClick={() => setEmailAlerts(!emailAlerts)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${emailAlerts ? "bg-blue-600" : "bg-gray-200"}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${emailAlerts ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Real-time Push Overlays
                  </p>
                  <p className="text-xs text-gray-400">
                    Receive immediate pings when automated transfers trigger.
                  </p>
                </div>
                <button
                  onClick={() => setPushAlerts(!pushAlerts)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${pushAlerts ? "bg-blue-600" : "bg-gray-200"}`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${pushAlerts ? "translate-x-5" : "translate-x-0"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Security Protocols block */}
          <div className="border-t border-gray-100 pt-5">
            <h4 className="mb-3 text-sm font-bold tracking-wider text-gray-400 uppercase">
              Security Protocols
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Two-Factor Authentication (2FA)
                </p>
                <p className="text-xs text-gray-400">
                  Secure transactions with secondary authentication codes.
                </p>
              </div>
              <button
                onClick={() => setTwoFactor(!twoFactor)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${twoFactor ? "bg-blue-600" : "bg-gray-200"}`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${twoFactor ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          </div>

          {/* Action Footer Submission Row */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
            <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
              <RefreshCw className="h-3.5 w-3.5" /> Revert
            </button>
            <button className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              <Save className="h-3.5 w-3.5" /> Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
