import React, { useEffect } from "react";
import DataTable from "../../components/admin/DataTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminNavbar.jsx";
const Dashboard = () => {
  const navigate = useNavigate();
  const adminInfo = useSelector((state) => state.adminAuth.adminInfo);

  useEffect(() => {
    if (!adminInfo) {
      navigate("/admin/login");
    }
  }, [adminInfo, navigate]);

  if (!adminInfo) {
    return null;
  }

  return (
    <>
      <AdminHeader />
      <div className="px-20 pt-1">
        <DataTable />
      </div>
    </>
  );
};

export default Dashboard;
