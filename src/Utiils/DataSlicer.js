import { createSlice } from "@reduxjs/toolkit";

const DataSlicer = createSlice({
  name: "ProductsData",
  initialState: {
    Products: [],
  },
  reducers: {
    storeData(state, { payload }) {
      console.log(payload);
      state.Products = payload;
    },
  },
});
export const { storeData } = DataSlicer.actions;
export default DataSlicer.reducer;
