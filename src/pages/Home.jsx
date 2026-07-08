import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Shield,
  Wallet,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-linear-to-b from-gray-50 to-gray-100/50 p-6 text-gray-900 antialiased">
      {/* Structural Card Container */}
      <div className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-3xl border border-white/60 bg-white/40 px-6 py-12 text-center shadow-xl backdrop-blur-md">
        {/* Main Badge Logo Metric */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
          <Wallet className="h-7 w-7" />
        </div>

        {/* Marketing Hero Copy text */}
        <div className="flex max-w-xl flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Smart Financial Tracking
          </h1>
          <p className="text-base leading-relaxed font-medium text-gray-500">
            Take complete control of your cash flow. Seamlessly monitor
            accounts, schedule recurring invoices, and build intuitive visual
            expense statements.
          </p>
        </div>

        {/* Global Action Interface Trigger Link */}
        <a
          href="/dashboard"
          className="group flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.98]"
        >
          <span>Open Workspace Workspace</span>
          <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
        </a>

        {/* Secondary Informational Grid Blocks */}
        <div className="mt-8 grid w-full grid-cols-1 gap-4 border-t border-gray-200/60 pt-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white/50 p-3 shadow-2xs">
            <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
              <BarChart3 className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-gray-900">Live Breakdown</p>
            <p className="text-center text-xs text-gray-400">
              Interactive graphical matrices parsed automatically.
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white/50 p-3 shadow-2xs">
            <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-gray-900">Auto Scheduling</p>
            <p className="text-center text-xs text-gray-400">
              Track upcoming bill distributions systematically.
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white/50 p-3 shadow-2xs">
            <div className="rounded-xl bg-purple-50 p-2 text-purple-600">
              <Shield className="h-5 w-5" />
            </div>
            <p className="text-sm font-bold text-gray-900">Secure Protocol</p>
            <p className="text-center text-xs text-gray-400">
              Client-side execution parameters protect telemetry entries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
