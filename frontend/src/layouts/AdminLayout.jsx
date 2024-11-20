import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="admin-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
