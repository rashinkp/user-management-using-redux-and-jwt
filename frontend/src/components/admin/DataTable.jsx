import React, { useState, useEffect } from "react";
import {
  useDeletUserMutation,
  useFetchUsersQuery,
} from "../../slices/adminApiSlices";
import Spinner from "../Spinner";
import { toast } from "react-toastify";
import UpdateUser from "./UpdateUser";
import AddUser from "./AddUser";
const imageBaseURL = "http://localhost:3000/";
const DataTable = () => {
  const { data: users, error, isLoading, refetch } = useFetchUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeletUserMutation();
  const [isEditUser, setIsEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddUser, setIsAddUser] = useState(false);

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete the user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted");
        refetch();
      } catch (err) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user.");
      }
    }
  };

  const handleEditClick = async (user) => {
    setSelectedUser(user);
    setIsEditUser(true);
    refetch();
  };

  useEffect(() => {
    if (isDeleting) {
      refetch();
    }
  }, [isDeleting, refetch]);

  const handleAddUserClick = () => {
    setIsAddUser(true);
  };

  return (
    <div className="flex flex-col">
      {isAddUser && <AddUser toggle={setIsAddUser} refetch={refetch} />}
      <div className="flex justify-end m-5">
        <button
          onClick={handleAddUserClick}
          href="#"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          + add user
        </button>
      </div>
      {isEditUser && (
        <UpdateUser
          toggle={setIsEditUser}
          userData={selectedUser}
          refetch={refetch}
        />
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {users && users.length > 0 ? (
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Count
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Profile
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Update
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, count) => (
                  <tr
                    key={user._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{count + 1}</td>

                    <td className="px-6 py-4">
                      <img
                        className="w-5 h-5 object-cover"
                        src={`${imageBaseURL}${user.profile.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt=""
                      />
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleEditClick(user)}>
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDeleteClick(user._id)}>
                        <a
                          href="#"
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Delete
                        </a>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No user Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;
