import { Route, Routes } from "react-router-dom";
import Authenticate from "./pages/Authenticate";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Authenticate />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
