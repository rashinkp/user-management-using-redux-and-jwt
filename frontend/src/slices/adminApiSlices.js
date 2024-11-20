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
        credentials: "include", // add this
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
      invalidatesTags: ["Users"],
    }),
    deletUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useFetchUsersQuery,
  useLogoutMutation,
  useAddUserMutation,
  useDeletUserMutation,
} = adminApiSlice;
