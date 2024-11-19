import React from "react";
import { useFetchUsersQuery } from "../../slices/adminApiSlices";

const DataTable = () => {
  const { data: users, error, isLoading } = useFetchUsersQuery();
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {users && users.length > 0 ? (
          <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Count
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
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No user Found</p>
        )}
      </div>
    </div>
  );
};

export default DataTable;
