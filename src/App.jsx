import Header from "./components/Header";
import RecipeResults from "./components/RecipeResults";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import RecipeCardContent from "./pages/RecipeCardContent";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<RecipeResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/:title/:id" element={<RecipeCardContent />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
