import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice.js";
import { logout } from "../../slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import UpdateUser from "./UpdateUser.jsx";
import { toast } from "react-toastify";

const imageBaseURL = "http://localhost:3000/";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [updateToggle, setUpdateToggle] = useState(false);

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      toast.success("Logout Successful");
      navigate("/user");
    } catch (err) {
      console.error(err);
    }
  };

  // Handle the profile image path
  const filePath =
    userInfo?.profile &&
    `${imageBaseURL}${userInfo.profile.replace(/\\/g, "/")}`;

  return (
    <>
      {updateToggle && <UpdateUser toggle={setUpdateToggle} />}
      <div className="w-full h-full max-w-md bg-gradient-to-r from-gray-700 to-gray-700 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 pt-20 pb-10">
        <div className="flex flex-col items-center pb-6">
          <img
            className="w-20 h-20 mb-3 rounded-full object-cover shadow-lg border-4 border-blue-500"
            src={filePath}
            alt="Profile"
          />
          <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
            {userInfo ? userInfo.name : "Guest"}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo ? userInfo.email : "guest@gmail.com"}
          </span>
          <div className="flex mt-20 space-x-3">
            <a
              onClick={() => setUpdateToggle(true)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Update Profile
            </a>
            <button
              onClick={handleLogoutClick}
              type="button"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 ms-5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
