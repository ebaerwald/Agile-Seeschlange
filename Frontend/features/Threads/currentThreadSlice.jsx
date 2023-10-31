import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currLoading: true,
  currThreadId: null,
  currError: null,
};

const CurrThreadSlice = createSlice({
  name: "currthreadid",
  initialState,
  reducers: {
    clearCurrError: (state) => {
      state.currError = null;
    },
    setCurrThreadId: (state, payload) => {
      state.currThreadId = payload.payload;
    },
    setCurrLoading: (state, payload) => {
      state.currLoading = payload.payload;
    },
  },
});
export const { clearCurrError, setCurrThreadId, setCurrLoading } =
  CurrThreadSlice.actions;

export default CurrThreadSlice.reducer;
