// adminApiSlice.js
import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      transformErrorResponse: (response) => response.data,
    }),
    fetchUsers: builder.query({
      query: () => `${ADMIN_URL}`,
      providesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: `${ADMIN_URL}/addUser`,
        method: "POST",
        body: userData,
      }),
    }),
    deletUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/deleteUser/${id}`,
        method: "DELETE",
      }),
    }),
    adminUpdateUser: builder.mutation({
      query: ({ id, formData }) => {
        console.log("Data being sent to backend:", formData);
        console.log("Id being sent to backend:", id);
        return {
          url: `${ADMIN_URL}/updateUser/${id}`,
          method: "PUT",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useFetchUsersQuery,
  useLogoutMutation,
  useAddUserMutation,
  useDeletUserMutation,
  useAdminUpdateUserMutation,
} = adminApiSlice;
