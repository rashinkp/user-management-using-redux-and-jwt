import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice.js";
import { setCredentials } from "../../slices/authSlice.js";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner.jsx";
import { adminLogin } from "../../slices/authAdmin.js";
import { useAdminLoginMutation } from "../../slices/adminApiSlices.js";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminLoginMutation, { isLoading, error }] = useAdminLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await adminLoginMutation({ email, password }).unwrap();

      // Dispatch the entire response directly
      dispatch(adminLogin(response)); // No need to wrap in { adminInfo: ... }

      toast.success("Login Successful");
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.message || err.message);
    }
  };
  const { adminInfo } = useSelector((state) => state.adminAuth); 

  useEffect(() => {
    if (adminInfo) {
      navigate('/admin');
    }
  },[navigate,adminInfo])

  return (
    <div className="mt-36">
      <form className="max-w-lg rounded-lg mx-auto bg-gray-900 p-10">
        <div className="text-center">
          <h1 className="font-bold text-2xl m-5">Admin Login</h1>
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Password"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={(e) => submitHandler(e)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
