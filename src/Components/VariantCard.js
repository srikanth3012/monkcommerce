import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const VariantCard = ({ item, parentCheck, setParent, setChildValues }) => {
  const dispatch = useDispatch();
  const [childCheck, setchildCheck] = useState(false);
  useEffect(() => {
    setchildCheck(parentCheck);
    if (parentCheck) {
      console.log("parent");
      setChildValues((prev) =>
        prev
          ? [
              ...prev,
              { variantId: item?.id, color: item?.title, price: item?.price },
            ]
          : [{ variantId: item?.id, color: item?.title, price: item?.price }]
      );
    } else setChildValues("");
  }, [parentCheck]);

  const inputHandler = (e) => {
    setchildCheck(!childCheck);
    setParent((prev) => !prev);
  };

  return (
    <div
      key={item?.id}
      id={item?.title}
      style={{
        display: "flex",
        height: "50px",
        gap: "10px",
        borderTop: "2px solid lightgray",
        marginTop: "1%",
        paddingLeft: "10%",
      }}
    >
      <input
        type="checkbox"
        value={item?.title + item?.price}
        onChange={inputHandler}
        checked={parentCheck || childCheck}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "70%",
          paddingTop: "3%",
        }}
      >
        {" "}
        <label>{item?.title}</label>
        <label>{item?.price}</label>
      </div>
    </div>
  );
};

export default VariantCard;
