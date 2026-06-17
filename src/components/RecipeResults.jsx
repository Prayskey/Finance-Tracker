import RecipeCard from "./RecipeCard";
import { recipes } from "../Recipes/recipes";

export default function RecipeResults() {
  return (
    <main className="mt-32 px-6 max-w-7xl mx-auto pb-20">
      {/* Result Details */}
      <section className="flex justify-between items-end mb-12">
        <div className="flex flex-col">
          <h2 className="font-black text-2xl tracking-tight text-gray-900">
            Recipe Result
          </h2>
          <div className="flex space-x-4 items-center mt-2 text-gray-500 font-medium text-sm tracking-tight">
            <p>{recipes.length} recipes found</p>
            <span className="text-gray-200">|</span>
            <p className="text-amber-600 hover:underline cursor-pointer transition-all">
              Edit Ingredients & Restrictions
            </p>
          </div>
        </div>
        <div>
          <button className="font-bold flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-white border border-gray-200 shadow-sm cursor-pointer hover:border-amber-500 hover:text-amber-600 transition-all duration-200 group">
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
      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              imageSrc={recipe.imageSrc}
              title={recipe.title}
              about={recipe.about}
              rating={recipe.rating}
              id={recipe.id}
            />
          );
        })}
      </section>
    </main>
  );
}
