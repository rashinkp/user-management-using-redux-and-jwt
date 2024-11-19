import { apiSlice } from "./apiSlice";
import { usersApiSlice } from "./usersApiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => `${ADMIN_URL}`,
      providesTags: ['User'],
    })
  })
})


export const {
  useFetchUsersQuery,
} = usersApiSlice;