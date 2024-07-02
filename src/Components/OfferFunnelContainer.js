import React, { useRef, useState } from "react";
import ProductInputBox from "./ProductInputBox";
import { FaQuestionCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { soretedTitle, soretedVariant } from "../Utiils/ProductSlicer";

const OfferFunnelContainer = () => {
  const [count, setCount] = useState([1, 2]);
  const [countLimit, setCountLimit] = useState();
  const [arr, setArr] = useState(false);
  const dragItem = useRef();
  const dragItemOver = useRef();
  const dispatch = useDispatch();

  const title = useSelector((store) => store?.Products?.title);
  const variant = useSelector((store) => store?.Products?.variant);

  const countHandler = () => {
    if (count.length < 4) setCount([...count, count[count.length - 1] + 1]);
    else setCountLimit("Limit Reached");
  };

  const handleCancel = (itemid, id) => {
    console.log(id);

    if (countLimit) setCountLimit("");

    const filterTitle = title.filter((ele) => ele?.id !== itemid);
    const filterVariant = variant.filter((ele) => ele?.id !== itemid);
    dispatch(soretedTitle(filterTitle));
    dispatch(soretedVariant(filterVariant));
    setCount((prev) => prev.filter((ele) => ele !== id));
    setArr(!arr);
  };

  const handleSort = () => {
    let items = [...title];
    const dragedItem = items.splice(dragItem.current, 1)[0];
    items.splice(dragItemOver.current, 0, dragedItem);
    dragItemOver.current = null;
    dragItem.current = null;

    dispatch(soretedTitle(items));
    setArr(!arr);
  };

  return (
    <div id="OfferFunnelContainer" style={{ marginLeft: "25%", width: "60%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "3px solid lightgray",
          alignItems: "center",
        }}
      >
        <div>
          {" "}
          <h1 style={{ fontWeight: "normal", fontSize: "30px" }}>
            OfferFunnel
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "-3%",
          }}
        >
          <h6
            style={{
              fontWeight: "normal",
              fontSize: "15px",
              textDecoration: "underline",
            }}
          >
            Support
          </h6>
          <span style={{ marginTop: "17%" }}>|</span>
          <h6
            style={{
              fontWeight: "normal",
              fontSize: "15px",
              textDecoration: "underline",
            }}
          >
            Talk to an Expert
          </h6>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          marginLeft: "5%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            justifyContent: "space-around",
          }}
        >
          <h3>
            Add Boundle Products{"("}Max. 4 productss{")"}
          </h3>
          <div style={{ display: "flex" }}>
            <div style={{ paddingBlock: "10px" }}>
              <IoMdAlert style={{ width: "30px", height: "25px" }} />
            </div>
            <p>
              Offer Bundle will be show to the customer whenever any of the
              bundle products are added to the cart
            </p>
          </div>
        </div>

        <div>
          {count.map((item, i) => (
            <div
              key={item - 1}
              style={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <ProductInputBox
                dragItemRef={dragItem}
                dragItemOverRef={dragItemOver}
                handleSort={handleSort}
                handleCancel={(itemid, id) => handleCancel(itemid, id)}
                id={item}
                idx={i}
              />
            </div>
          ))}

          <div
            style={{
              display: "flex",
              width: "600px",
              justifyContent: "end",
              marginTop: "20px",
            }}
          >
            {countLimit && (
              <div
                style={{
                  color: "red",
                  paddingRight: "12px",
                  textDecoration: "underline",
                }}
              >
                {countLimit}
              </div>
            )}
            <button
              style={{
                width: "350px",
                height: "40px",
                marginBottom: "30px",
                background: "#0b4535",
                color: "white",
              }}
              onClick={countHandler}
            >
              Add Product
            </button>
          </div>
        </div>
        <div>
          <input type="checkbox" />
          <label>Apply discount on compare price</label>
          <p>
            Discount will be applied on compare price of the product. Discount
            set inside the upsell offer should be more than or equal to the
            discount set on a product in your store.
          </p>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <h3 style={{ textDecoration: "underline" }}>
              Advanced Offer Customizations
            </h3>
            <FaQuestionCircle style={{ marginTop: "3%", marginLeft: "10px" }} />
          </div>
          <input type="checkbox" />
          <label>Enable timer for this</label>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          background: "white",
          padding: "10px",
          marginTop: "10px",
          marginLeft: "35px",
        }}
      >
        <label
          style={{
            border: "2px solid green",
            paddingInline: "25px",
            paddingBlock: "5px",
            background: "green",
            color: "white",
          }}
        >
          back
        </label>
        <label
          style={{
            border: "2px solid green",
            paddingInline: "25px",
            paddingBlock: "5px",
            background: "green",
            color: "white",
          }}
        >
          Next
        </label>
      </div>
    </div>
  );
};

export default OfferFunnelContainer;
