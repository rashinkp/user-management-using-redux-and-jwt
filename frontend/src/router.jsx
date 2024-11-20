import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import UserLayout from "./layouts/UserLayout.jsx";
// import AdminLayout from "./layouts/AdminLayout.jsx";

import HomePage from "./screens/user/HomePage.jsx";
import LoginPage from "./screens/user/LoginPage.jsx";
import RegisterPage from "./screens/user/RegisterPage.jsx";

import AdminLoginPage from "./screens/admin/Login.jsx";
// import UserManagement from "../screens/admin/UserManagement";
import AdminDashboard from "./screens/admin/Dashboard.jsx";

import Entry from "./screens/Entry.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Entry Route */}
      <Route path="/" element={<Entry />} />

      {/* User Routes */}
      <Route path="user" element={<UserLayout />}>
        <Route index path="" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route path="" element={<AdminDashboard />} />
        <Route path="login" element={<AdminLoginPage />} />
      </Route>
    </>
  )
);

export default router;
