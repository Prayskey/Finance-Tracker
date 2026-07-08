import { Route, Routes } from "react-router-dom";
import Authenticate from "./pages/Authenticate";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Routes>
      {/* Marketing / Overview Gateway Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Secure Portal Authentication Form Screen */}
      <Route path="/auth" element={<Authenticate />} />

      {/* Main Internal Operational Workspace App Dashboard Canvas */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 404 Page Not Found: Catches all unregistered trailing links */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
