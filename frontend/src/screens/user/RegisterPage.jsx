import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner.jsx";
import { setCredentials } from "../../slices/authSlice.js";
import { useRegisterMutation } from "../../slices/UsersApiSlice.js";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/user");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!profile) {
      toast.error("Profile image is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile", profile);

    try {
      const res = await register(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration Successful");
      navigate("/user");
    } catch (err) {
      toast.error(
        err?.data?.message || err.error || err.message || "An error occured"
      );
    }
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (file && !allowedTypes.includes(file.type)) {
      toast.error("Invalid image format");
      e.target.value = null;
    } else {
      setProfile(file);
    }
  };

  return (
    <div className="mt-10">
      {isLoading ? (
        <Spinner />
      ) : (
        <form
          className="max-w-lg rounded-lg mx-auto bg-gray-900 p-10"
          onSubmit={submitHandler}
        >
          <div className="text-center">
            <h1 className="font-bold text-2xl m-5">Sign Up</h1>
          </div>

          {/* Name Input */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
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

          {profile && (
            <div className="mb-5">
              <img
                src={URL.createObjectURL(profile)}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}

          <div className="mb-5">
            <label
              htmlFor="profile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Profile Image
            </label>
            <input
              type="file"
              id="profile"
              onChange={(e) => handleFileChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit" // The form will now submit using the form's onSubmit
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
          </div>

          {/* Link to Login */}
          <div className="mt-3 underline text-blue-200 text-center">
            <Link to="/user/login">Already have an account? Login here</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
