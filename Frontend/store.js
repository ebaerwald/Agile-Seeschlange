import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import threadsReducer from "../Frontend/features/Threads/threadsSlice.jsx";
import FavoriteThreadsReducer from "../Frontend/features/Threads/favoriteThreadsSlice.jsx";
import CurrThreadsReducer from "../Frontend/features/Threads/currentThreadSlice.jsx";
import { threadsApiSlice } from "./features/threadsApiSlice.jsx";

// import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    favThreads: FavoriteThreadsReducer,
    currThreads: CurrThreadsReducer,
    // [recipesApiSlice.reducerPath]: recipesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(threadsApiSlice.middleware),
});
// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// See `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
