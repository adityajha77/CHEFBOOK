import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider
import "./index.css";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound"; // Assuming a NotFound page exists

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* Add other routes as needed */}
          <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
