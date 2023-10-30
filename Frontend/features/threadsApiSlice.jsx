import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const threadsApiSlice = createApi({
  reducerPath: "threadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.178.59:3001/api",
  }),
  endpoints: (builder) => ({
    getThreads: builder.query({
      query: () => "/threads",
    }),
    getThreadById: builder.query({
      query: (token) => ({
        url: "/myrecipesbyname",
        method: "POST",
        body: token,
      }),
    }),
    deleteThread: builder.query({
      query: (token, recipeId) => ({
        url: `/recipes/${recipeId}`,
        method: "DELETE",
        headers: { "x-auth-token": token },
      }),
    }),
  }),
});

export const {
  useGetThreadsQuery,
  useGetThreadByIdQuery,
  useDeleteThreadQuery,
} = threadsApiSlice;
