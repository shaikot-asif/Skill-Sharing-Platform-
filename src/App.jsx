import "./App.css";
import HomePage from "./pages/home/HomePage";
import { Routes, Route } from "react-router-dom";
import ArticleDetailsPage from "./pages/articleDetail/ArticleDetailsPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from "./pages/admin/screen/Admin";
import Comments from "./pages/admin/screen/comments/Comments";
import ManagePost from "./pages/admin/screen/posts/ManagePost";
import EditPost from "./pages/admin/screen/posts/EditPost";
import User from "./pages/admin/screen/users/User";
import Chat from "./pages/messages/Chat";
function App() {
  return (
    <div className="font-openSans bg-dark-hard">
      <Routes>
        <Route index path="/" element={<HomePage />} />

        <Route path="/blog/:slug" element={<ArticleDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />

          <Route path="posts/manage" element={<ManagePost />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route path="users/manage" element={<User />} />
        </Route>
        <Route path="/messages" element={<Chat />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
