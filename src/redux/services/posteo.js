import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const posteoApi = createApi({
  reducerPath: "posteoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004" }),
  tagTypes: ["Post"], //Agrego tag para que se refresque automáticamente los datos al mutarlos
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/posts`,
      providesTags: ["Post"], //Agrego el tag
    }),
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"], //Agrego el tag
    }),
    addPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"], //cualquier dato de caché proporcionado con la 'Post'etiqueta ya no es válido.
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = posteoApi;
