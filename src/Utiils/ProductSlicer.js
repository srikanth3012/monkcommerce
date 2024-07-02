import { createSlice } from "@reduxjs/toolkit";
const ProductSlicer = createSlice({
  name: "Products",
  initialState: { title: [], variant: [], uId: [] },
  reducers: {
    addTitle(state, { payload }) {
      state.title.push(payload);
    },
    addVariant(state, { payload }) {
      state.variant.push(payload);
    },
    soretedTitle(state, { payload }) {
      state.title = [...payload];
    },
    soretedVariant(state, { payload }) {
      state.variant = [...payload];
    },
  },
});
export const { addVariant, addTitle, soretedVariant, soretedTitle } =
  ProductSlicer.actions;
export default ProductSlicer.reducer;
