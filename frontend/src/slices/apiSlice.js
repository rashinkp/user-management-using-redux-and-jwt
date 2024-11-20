import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Admin"],
  endpoints: (builder) => ({}),
});
