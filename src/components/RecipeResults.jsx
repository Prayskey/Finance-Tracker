import RecipeCard from "./RecipeCard";
import { recipes } from "../Recipes/recipes";
import { Link } from "react-router-dom";

export default function RecipeResults() {
  return (
    <main className="mx-auto mt-32 max-w-7xl px-6 pb-20">
      {/* Result Details */}
      <section className="mb-12 flex items-end justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black tracking-tight text-gray-900">
            Recipe Result
          </h2>
          <div className="mt-2 flex items-center space-x-4 text-sm font-medium tracking-tight text-gray-500">
            <p>{recipes.length} recipes found</p>
            <span className="text-gray-200">|</span>
            <p className="cursor-pointer text-amber-600 transition-all hover:underline">
              Edit Ingredients & Restrictions
            </p>
          </div>
        </div>
        <div>
          <button className="group flex cursor-pointer items-center space-x-1.5 rounded-2xl border border-gray-200 bg-white px-4 py-2 font-bold shadow-sm transition-all duration-200 hover:border-amber-500 hover:text-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 group-hover:text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            <span className="text-sm">Filter</span>
          </button>
        </div>
      </section>
      {/* Recipes Result */}
      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => {
          const slug = recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          return (
            <Link
              to={`/${slug}/${recipe.id}`}
              state={{ recipe }}
              key={recipe.id}
            >
              <RecipeCard
                imageSrc={recipe.imageSrc}
                title={recipe.title}
                about={recipe.about}
                rating={recipe.rating}
                id={recipe.id}
              />
            </Link>
          );
        })}
      </section>
    </main>
  );
}
