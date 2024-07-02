import React, { useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";

const AddProduct = ({ data, setShowProducts, idx }) => {
  const [productData, setProductData] = useState();
  const [Add, setAdd] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const mainData = useSelector((store) => store?.ProductData?.Products);
  const [page, setPage] = useState(10);
  const popUpRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setProductData(mainData);
  }, [mainData]);
  useEffect(() => {}, [page]);

  const handlerOk = () => {
    setAdd(true);
  };
  const handelSearch = (value) => {
    setSearchInput(value);
    const filterData = mainData?.filter((item) =>
      item?.title?.toLowerCase().includes(value.toLowerCase())
    );

    setProductData(filterData);
  };
  const handleScroll = () => {
    if (popUpRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = popUpRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        console.log("scroll");
        setPage((prev) => prev + 10);
      }
    }
  };
  if (!productData) return <p>fetching</p>;
  return (
    <>
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 1,
          top: 0,
          left: 0,
          opacity: 0.5,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          zIndex: 2,
          width: "35%",
          height: "80%",
          background: "white",
          left: "50%",
          top: "15%",

          borderRadius: "1%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid lightgray",
            paddingTop: "4%",
            paddingInline: "4%",
          }}
        >
          <h3 style={{ fontWeight: "normal", marginTop: "-0.5px" }}>
            Add Products
          </h3>
          <MdOutlineClose
            style={{ width: "20px", height: "30px", marginTop: "" }}
            onClick={() => setShowProducts((prev) => !prev)}
          />
        </div>
        <div style={{ paddingBottom: "2%" }}>
          <input
            type="text"
            placeholder="search"
            value={searchInput}
            onChange={(e) => handelSearch(e.target.value)}
            style={{
              border: "2px solid lightgray",
              width: "90%",
              height: "25px",
              padding: "5px",
              marginTop: "2%",
              marginLeft: "3%",
            }}
          />
        </div>
        <div
          onScroll={handleScroll}
          ref={popUpRef}
          style={{
            overflow: "scroll",
            height: "70%",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {productData.map((item) => (
            <div key={item?.id}>
              <ProductCard
                item={item}
                ok={Add}
                setShowProducts={setShowProducts}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            width: "90%",
            justifyContent: "end",
            padding: "10px",
          }}
        >
          <label
            style={{
              border: "2px solid gray",
              paddingInline: "25px",
              paddingBlock: "5px",

              borderRadius: "8%",
              marginRight: "2%",
            }}
            onClick={handlerOk}
          >
            Cancel
          </label>
          <label
            style={{
              border: "2px solid green",
              paddingInline: "25px",
              paddingBlock: "5px",
              background: "green",
              color: "white",
              borderRadius: "8%",
            }}
            onClick={handlerOk}
          >
            Add
          </label>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
