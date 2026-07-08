import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-linear-to-b from-gray-50 to-gray-100/50 p-6 text-gray-900 antialiased">
      {/* Central Error Block Content Wrapper */}
      <div className="flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-gray-200/80 bg-white p-8 text-center shadow-xl">
        {/* Visual Anchor Indicator */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 shadow-xs">
          <AlertCircle className="h-7 w-7" />
        </div>

        {/* Core Explanatory Copy Labels */}
        <div className="flex flex-col gap-1.5">
          <h1 className="font-mono text-4xl font-extrabold tracking-tight text-gray-950">
            404
          </h1>
          <h2 className="text-xl font-bold text-gray-900">
            Route Matrix Fragmented
          </h2>
          <p className="text-sm leading-relaxed font-medium text-gray-500">
            The workspace path you are trying to access does not exist or has
            been shifted permanently to another secure location.
          </p>
        </div>

        {/* Interactive Return To Safe Route Trigger */}
        <Link
          to="/"
          className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4 text-gray-400 transition-transform group-hover:-translate-x-0.5 group-hover:text-white" />
          <span>Return To Safe Gateway</span>
        </Link>
      </div>
    </div>
  );
}
