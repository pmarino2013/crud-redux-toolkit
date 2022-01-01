import { configureStore } from "@reduxjs/toolkit";

import { posteoApi } from "./services/posteo";

const store = configureStore({
  reducer: {
    [posteoApi.reducerPath]: posteoApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(posteoApi.middleware),
});

export default store;
