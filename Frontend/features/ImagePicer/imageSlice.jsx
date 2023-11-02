import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
};

const ImageSlice = createSlice({
  name: "imagePicer",
  initialState,
  reducers: {
    setImage: (state, payload) => {
      state.image = payload.payload;
    },
  },
});
export const { setImage } = ImageSlice.actions;

export default ImageSlice.reducer;
