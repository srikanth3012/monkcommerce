import { createSlice } from "@reduxjs/toolkit";

const PageSlicer = createSlice({
  name: "Page",
  initialState: {
    page: 10,
  },
  reducers: {
    addPage(state) {
      state.page += 20;
    },
  },
});
export const { addPage } = PageSlicer.actions;
export default PageSlicer.reducer;
