import React from "react";
import { Link } from "react-router-dom"; 

const Entry = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="space-x-4">
        {/* Link for User */}
        <Link
          to="/user" 
          className="px-6 py-3 text-xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          User
        </Link>

        {/* Link for Admin */}
        <Link
          to="/admin/dashboard" 
          className="px-6 py-3 text-xl font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 focus:outline-none"
        >
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Entry;
