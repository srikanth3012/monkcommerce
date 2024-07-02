import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTitle, addVariant } from "../Utiils/ProductSlicer";
import VariantCard from "./VariantCard";

const ProductCard = ({ item, ok, setShowProducts }) => {
  // Initial state for parent and child checkboxes
  //console.log(item);
  const { title, images, variants } = item;
  console.log(images[0]?.src);
  const [childValues, setChildValues] = useState([]);
  const [parent, setParent] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (ok) {
      if (parent) {
        dispatch(addTitle({ id: item?.id, title: item?.title }));
        console.log(childValues);
        childValues.map((ele) => {
          dispatch(addVariant({ id: item?.id, ...ele }));
          dispatch(
            addVariant({
              id: item?.id,
              variantId: ele?.variantId + "1",
              color: "White",
              price: "20.99",
            })
          );
        });
      }

      setShowProducts(false);
    }
  }, [ok]);

  // Handle parent checkbox change
  const handleParentChange = () => {
    setParent((prev) => !prev);
  };

  // Handle child checkbox change

  return (
    <div>
      <div
        style={{
          display: "flex",
          borderTop: "2px solid lightgray",
          padding: "0%",
          paddingLeft: "3%",
          gap: "15px",
        }}
      >
        <input type="checkbox" checked={parent} onClick={handleParentChange} />
        <img
          alt="productImd"
          style={{
            width: "8%",
            height: "30px",
            marginTop: "4%",
          }}
          src={images[0]?.src}
        />
        <h3>{title}</h3>
      </div>
      <div>
        {variants &&
          variants.map((item) => (
            <VariantCard
              item={item}
              parentCheck={parent}
              setParent={setParent}
              setChildValues={setChildValues}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductCard;
