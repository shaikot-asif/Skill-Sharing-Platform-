import "./App.css";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import ArticleDetailsPage from "./pages/articleDetail/ArticleDetailsPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="font-openSans bg-dark-hard">
      <Routes>
        <Route index path="/" element={<HomePage />} />

        <Route path="/blog/:id" element={<ArticleDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;