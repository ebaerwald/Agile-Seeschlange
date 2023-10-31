import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config"; // Importiere die conf.js-Datei

export const threadsApiSlice = createApi({
  reducerPath: "threadsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${config.serverIP}:3001/api`,
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
