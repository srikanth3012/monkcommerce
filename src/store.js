import { configureStore } from "@reduxjs/toolkit";
import ProductSlicer from "./Utiils/ProductSlicer";
import DataSlicer from "./Utiils/DataSlicer";
import PageSlicer from "./Utiils/PageSlicer";

const Store = configureStore({
  reducer: {
    Products: ProductSlicer,
    ProductData: DataSlicer,
    Pages: PageSlicer,
  },
});
export default Store;
