import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className=" fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <div className="lg:w-1/3">
          <a className="relative transform-gpu cursor-default text-2xl font-black tracking-tight text-gray-900 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:transform-gpu after:bg-amber-500 after:transition-transform after:duration-300 after:ease-out after:backface-hidden hover:after:scale-x-100">
            GORAMA<span className="text-amber-500">.</span>
          </a>
        </div>

        <nav className="hidden justify-center space-x-8 text-sm font-semibold tracking-wider text-gray-500 uppercase lg:flex lg:w-1/3">
          {["Ingredients", "Recipes", "Tips", "About"].map((item) => {
            return (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="relative py-2 text-gray-600 transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-amber-500 after:transition-transform after:duration-300 after:ease-out hover:text-gray-900 hover:after:scale-x-100"
              >
                {item}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-end space-x-4 lg:w-1/3">
          <button className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            Sign In
          </button>
          <button className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-gray-200 transition-all hover:bg-gray-800 active:scale-95">
            Join Free
          </button>
        </div>
      </div>
    </header>
  );
}
