import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favLoading: true,
  favThreads: [],
  favError: null,
};

const FavThreadSlice = createSlice({
  name: "favthreads",
  initialState,
  reducers: {
    clearFavError: (state) => {
      state.favError = null;
    },
    setFavThreads: (state, payload) => {
      state.favThreads = payload.payload;
    },
    setFavLoading: (state, payload) => {
      state.favLoading = payload.payload;
    },
  },
});
export const { clearFavError, setFavThreads, setFavLoading } =
  FavThreadSlice.actions;

export default FavThreadSlice.reducer;
