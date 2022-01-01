import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const posteoApi = createApi({
  reducerPath: "posteoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `posts`,
    }),
  }),
});

export const { useGetPostsQuery } = posteoApi;
