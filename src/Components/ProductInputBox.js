import React, { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { MdOutlineClose } from "react-icons/md";
import AddProduct from "./AddProduct";
import { useDispatch, useSelector } from "react-redux";

import Variants from "./Variants";
import { soretedVariant } from "../Utiils/ProductSlicer";

const ProductInputBox = ({
  dragItemRef,
  dragItemOverRef,
  handleSort,
  handleCancel,
  id,
  idx,
}) => {
  const [showProducts, setShowProducts] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [value, setValue] = useState(false);
  const [discount, setDiscount] = useState();
  const [showVariant, setShowVariant] = useState(false);
  const dragVariantItem = useRef();
  const dragVariantItemOver = useRef();

  const data = useSelector((store) => store?.ProductData?.Products);
  const title = useSelector((store) => store?.Products?.title);
  const variant = useSelector((store) => store?.Products?.variant);

  let variantItems = variant.filter((ele) => ele?.id == title[idx]?.id);

  const dispatch = useDispatch();

  useEffect(() => {
    variantItems = variant.filter((ele) => ele?.id == title[idx]?.id);
    if (variantItems.length) setValue(!value);
  }, [id]);

  useEffect(() => {
    setValue(!value);
  }, [data, title]);

  const addProductHandler = () => setShowProducts(!showProducts);
  const variantHandler = () => setShowVariant(!showVariant);
  const handleDiscount = (e) => setDiscount(e.target.value);
  //getVariant from redux Store

  // Variant Sorting
  const handleVariantSort = () => {
    const draggedIndex = dragVariantItem.current;
    const overIndex = dragVariantItemOver.current;

    if (draggedIndex !== overIndex) {
      const itemsCopy = variantItems;
      const draggedItem = itemsCopy.splice(draggedIndex, 1)[0];
      itemsCopy.splice(overIndex, 0, draggedItem);
      let newVariant = variant.filter((ele) => ele?.id !== title[idx]?.id);

      const totalVariant = [...itemsCopy, ...newVariant];

      dispatch(soretedVariant(totalVariant));
      variantItems = itemsCopy;
      setValue(!value);
    }

    dragVariantItem.current = null;
    dragVariantItemOver.current = null;
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          margin: "10px",
          marginBottom: "4%",
        }}
        id={idx}
        draggable
        onDragStart={(e) => (dragItemRef.current = idx)}
        onDragEnter={(e) => (dragItemOverRef.current = idx)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
      >
        <div>
          <PiDotsSixVerticalBold
            style={{ width: "50px", height: "30px", marginTop: "10%" }}
          />
        </div>
        <div>
          <span style={{ marginRight: "8px" }}>{idx + 1}.</span>
          <input
            style={{
              width: "350px",
              height: "40px",
              paddingLeft: "10px",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
            }}
            type="text"
            placeholder="Enter Product name"
            value={title[idx]?.title}
          />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: "10px",
            marginLeft: "400px",
            marginTop: "10px",
          }}
        >
          <FaPen onClick={addProductHandler} />
        </div>
        <div style={{ display: "flex" }}>
          {!showDiscount ? (
            <button
              style={{
                width: "150px",
                height: "43px",
                marginLeft: "1px",
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                background: "#0b4535",
                color: "white",
              }}
              onClick={() => setShowDiscount(true)}
            >
              Add Discount
            </button>
          ) : (
            <div>
              <input
                style={{
                  width: "50px",
                  height: "30px",
                  marginLeft: "5px",
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                }}
                type="text"
                placeholder="enter"
              />
              <select
                style={{
                  width: "70px",
                  height: "35px",
                  marginLeft: "5px",
                  boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.2)",
                }}
                id="options"
                name="options"
                onChange={handleDiscount}
              >
                <option value="% off">% off</option>
                <option value="flat off">flat off</option>
              </select>
            </div>
          )}
        </div>
        {/* cancelbutton */}
        <MdOutlineClose
          style={{ width: "20px", height: "30px", marginTop: "2px" }}
          onClick={() => handleCancel(title[idx]?.id, id)}
        />
      </div>

      <div>
        {showProducts && (
          <AddProduct data={data} setShowProducts={setShowProducts} idx={id} />
        )}
      </div>
      {variantItems.length > 0 && (
        <div
          style={{
            marginLeft: "-22%",
            marginTop: "7.3%",
            cursor: "pointer",
            textDecoration: "underline",
            color: "#1BB1ED",
          }}
          onClick={variantHandler}
        >
          {showVariant ? "Hide Variants" : "Show Variants"}
        </div>
      )}
      {showVariant && (
        <div style={{ marginTop: "10%", marginLeft: "-60%" }}>
          <Variants
            data={variantItems}
            handleVariantSort={handleVariantSort}
            dragVariantItemRef={dragVariantItem}
            dragVariantItemOverRef={dragVariantItemOver}
          />
        </div>
      )}
    </>
  );
};

export default ProductInputBox;
