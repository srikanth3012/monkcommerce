import React, { useEffect } from "react";
import OfferFunnelContainer from "./OfferFunnelContainer";
import UseData from "../Hooks/UseData";
import { useDispatch } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    UseData(dispatch);
  }, []);

  return (
    <div>
      <OfferFunnelContainer />
    </div>
  );
};

export default Body;
