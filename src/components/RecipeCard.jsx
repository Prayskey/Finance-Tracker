export default function RecipeCard({ imageSrc, title, about, rating }) {
  return (
    <div className="relative cursor-pointer overflow-hidden rounded-4xl border-4 border-white bg-white shadow-sm transition-shadow hover:shadow-md h-96 ">
      <div className="aspect-square bg-gray-100">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-3/5 mask-[linear-gradient(to_bottom,transparent,black_35%)] backdrop-blur-md [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_35%)]" />

      <div className="absolute inset-x-0 bottom-0 z-20 h-3/5 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 z-30 w-full space-y-2 px-4 pb-4 text-white">
        <p className="text-md font-bold">{title}</p>
        <p className="line-clamp-2 text-xs">{about}</p>
        <div className="flex items-center space-x-2">
          <p className="text-xs font-bold text-amber-500">
            ★ {rating.toFixed(1)}
          </p>
          <p className="text-[10px] font-medium">(Verified Recipe)</p>
        </div>
        <button className="w-full cursor-pointer rounded-full bg-gray-100 py-1 text-sm font-medium text-black">
          View
        </button>
      </div>

    </div>
  );
}
