import React, { useEffect } from "react";
import DataTable from "../../components/admin/DataTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div className="p-10">
      <DataTable /> {/* DataTable will render only if adminInfo is available */}
    </div>
  );
};

export default Dashboard;
