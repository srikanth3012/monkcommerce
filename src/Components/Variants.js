import React, { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { soretedVariant } from "../Utiils/ProductSlicer";

const Variants = ({
  data,
  handleVariantSort,
  dragVariantItemRef,
  dragVariantItemOverRef,
}) => {
  let [productVariants, setProductVariants] = useState();

  const variant = useSelector((store) => store?.Products?.variant);

  const dispatch = useDispatch();
  const handleVarientCancel = (item) => {
    const filterArr = variant.filter(
      (ele) => ele?.variantId !== item?.variantId
    );
    dispatch(soretedVariant(filterArr));
    setProductVariants(filterArr);
  };
  useEffect(() => {
    setProductVariants(data);
  }, [data]);

  return (
    <div style={{}}>
      {productVariants?.map((item, i) => (
        <div key={i}>
          <div
            id={i}
            style={{ display: "flex", width: "300%", marginLeft: "30%" }}
            draggable
            onDragStart={(e) => (dragVariantItemRef.current = i)}
            onDragEnter={(e) => (dragVariantItemOverRef.current = i)}
            onDragEnd={handleVariantSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <PiDotsSixVerticalBold
              id={i}
              style={{ width: "50px", height: "30px", marginTop: "12px" }}
            />
            <div
              style={{
                border: "2px solid lightgray",
                width: "60%",
                height: "35px",
                margin: "1%",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontWeight: "normal",
                  paddingLeft: "25px",
                  marginTop: "7px",
                  fontSize: "15px",
                  justifyContent: "space-between",
                  paddingRight: "25px",
                }}
              >
                {" "}
                <label>{item?.color}</label>
                <label>Price:{item?.price}</label>
              </div>
            </div>
            <MdOutlineClose
              style={{ width: "20px", height: "30px", marginTop: "12px" }}
              onClick={() => handleVarientCancel(item)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Variants;
