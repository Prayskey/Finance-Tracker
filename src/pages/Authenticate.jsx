import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Authenticate() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setError(null);
  };

  const handleToggleMode = () => {
    setIsSignUp((prev) => !prev);
    resetFields();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: replace with real auth call, e.g.
      // await api.post(isSignUp ? "/auth/register" : "/auth/login", { email, password, fullName });
      console.log("Authentication submission triggered:", {
        email,
        password,
        fullName,
        mode: isSignUp ? "register" : "login",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    // TODO: wire up OAuth redirect/flow once backend endpoint exists
  };

  const handleForgotPassword = () => {
    // TODO: navigate to /forgot-password route or open reset modal
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-linear-to-b from-gray-50 to-gray-100/50 p-6 text-gray-900 antialiased">
      <div className="flex w-full max-w-md flex-col gap-6 rounded-3xl border border-gray-200/80 bg-white p-8 shadow-xl">
        <Link
          to="/"
          className="flex w-fit items-center gap-1.5 text-xs font-semibold text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Home
        </Link>

        {/* Core Header Branding */}
        <div className="flex flex-col items-center gap-2 text-center">

          
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
            <Wallet className="h-6 w-6" />
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-gray-950">
            {isSignUp ? "Create Workspace Account" : "Access Finance Tracker"}
          </h1>
          <p className="text-xs font-medium text-gray-400">
            {isSignUp
              ? "Get started by securing your dashboard keys"
              : "Enter credentials to unlock secure workspace logs"}
          </p>
        </div>

        {/* Third-Party Authentication Integration Matrix */}
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={handleGoogleAuth}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-2xs transition hover:bg-gray-50 active:scale-[0.99]"
          >
            {/* Google Vector Icon Logo Wrapper */}
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.27 1.516 15.54 0 12.24 0 5.58 0 0 5.58 0 12.24s5.58 12.24 12.24 12.24c6.96 0 11.58-4.894 11.58-11.82 0-.795-.085-1.4-.195-1.956H12.24z"
              />
            </svg>
            <span>Continue with Google Gateway</span>
          </button>
        </div>

        {/* Textual Separator Divider */}
        <div className="my-1 flex items-center">
          <div className="flex-1 border-t border-gray-100" />
          <span className="px-3 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Or Secure Email
          </span>
          <div className="flex-1 border-t border-gray-100" />
        </div>

        {/* Inline error message */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700"
          >
            {error}
          </div>
        )}

        {/* Input Interactive Form Fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Conditional Name Field for Register Step */}
          {isSignUp && (
            <div className="animate-fadeIn">
              <label
                htmlFor="fullName"
                className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 placeholder-gray-300 shadow-2xs transition focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Email Target Parameter Input */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-gray-500 uppercase"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 pr-3 pl-10 text-sm text-gray-800 placeholder-gray-300 shadow-2xs transition focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Target Parameter Input */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-500 uppercase"
              >
                Password Key
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Forgot Key?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 py-2.5 pr-10 pl-10 text-sm text-gray-800 placeholder-gray-300 shadow-2xs transition focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Form Action Submit Button Trigger */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>
              {isSubmitting
                ? "Please wait..."
                : isSignUp
                  ? "Register Account"
                  : "Unlock Workspace"}
            </span>
            {!isSubmitting && (
              <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
            )}
          </button>
        </form>

        {/* View Toggle Panel Footer Link */}
        <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-500">
          {isSignUp
            ? "Already registered on this dashboard? "
            : "New to this tracking environment? "}
          <button
            type="button"
            onClick={handleToggleMode}
            className="cursor-pointer font-bold text-blue-600 hover:underline"
          >
            {isSignUp ? "Sign In Instead" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
