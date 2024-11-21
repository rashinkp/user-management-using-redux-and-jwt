import { useState } from "react";
import Spinner from "../Spinner";
import { useAdminUpdateUserMutation } from "../../slices/adminApiSlices";
import { toast } from "react-toastify";

const UpdateUser = ({ toggle, userData, refetch }) => {
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState(userData?.password || '')
  const [profile , setProfile] = useState(null)
  
  const [updateProfile, { isLoading }] = useAdminUpdateUserMutation();

  const updateSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append("email", email);
    formData.append("password", password);
    if (profile) {
      formData.append("profile", profile);
    }

    const id = userData._id;

    try {
      const res = await updateProfile({ id, formData }).unwrap();
      refetch();
      toast.success("User data updated");
      toggle(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err);
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
    <div>
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <div
            id="authentication-modal"
            tabIndex={-1}
            className={`${
              toggle ? "flex" : "hidden"
            } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full backdrop-blur-sm bg-gray-900 bg-opacity-50`}
          >
            <div className="relative p-4 w-full max-w-xl max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-10">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Your Profile
                  </h3>
                  <button
                    type="button"
                    onClick={() => toggle(false)}
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="p-4 md:p-5">
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder={name}
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder={email}
                        required=""
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="profile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Profile Image
                      </label>
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        onChange={(e) => handleFileChange(e)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="User profile"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="**********"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={(e) => updateSubmitHandler(e)}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default UpdateUser;
