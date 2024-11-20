import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      
      <div className="admin-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
