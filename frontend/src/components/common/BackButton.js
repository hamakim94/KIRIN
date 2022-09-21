import { AiOutlineLeft } from "react-icons/ai";
import React from "react";

function BackButton() {
  const style = { marginRight: 10, display: "flex", justifyContent: "center" };
  return (
    <>
      <AiOutlineLeft style={style} size={20}></AiOutlineLeft>
    </>
  );
}

export default BackButton;
