import { useLocation } from "react-router-dom";

export default function RecipeCardContent() {
  const location = useLocation();
  const { title, about } = location.state.recipe;

  return (
    <section className="pt-30">
      <h2>{title}</h2>
      <p>{about}</p>
    </section>
  );
}
