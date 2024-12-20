import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "../../components/user/Profile.jsx";

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="m-10 flex justify-center">
      {userInfo ? (
        <Profile />
      ) : (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Hi there how are you
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Please signup or signin to get infromation about your data .
            Welcom......
          </p>
          <div>
            <Link to="/user/login">
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Sign In
              </button>
            </Link>

            <Link to="/user/register">
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
