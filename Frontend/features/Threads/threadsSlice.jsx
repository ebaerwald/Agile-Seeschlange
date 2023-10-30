import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  threads: [],
  error: null,
};

const ThreadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setThreads: (state, payload) => {
      state.threads = payload.payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload.payload;
    },
  },
});
export const { clearError, setThreads, setLoading } = ThreadSlice.actions;

export default ThreadSlice.reducer;
