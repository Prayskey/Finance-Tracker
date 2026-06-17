import { Link } from "react-router-dom";
import { recipes } from "../Recipes/recipes";

export default function RecipeCard({ imageSrc, title, about, rating, id }) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const recipe = recipes.filter((r) => r.id == id)[0];

  return (
    <Link
      to={`/${slug}/${id}`}
      state={{ recipe }}
      className="cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-square bg-gray-100">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="p-4">
        <p className="text-lg font-bold">{title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{about}</p>
        <div className="mt-2 flex items-center space-x-2">
          <p className="text-xs font-bold text-amber-500">
            ★ {rating.toFixed(1)}
          </p>
          <p className="text-[10px] font-medium text-gray-400">
            (Verified Recipe)
          </p>
        </div>
      </div>
    </Link>
  );
}
