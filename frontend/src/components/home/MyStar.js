import React from "react";
import { useNavigate } from "react-router-dom";

function MyStar(props) {
  const num = 2;
  const navigate = useNavigate();
  return (
    <img
      alt='star'
      className={props.styles.starImg}
      src='https://cdn.pixabay.com/photo/2022/05/06/17/15/cartoon-giraffe-7178753_960_720.jpg'
      onClick={() => navigate(`/star/${num}`)}
    ></img>
  );
}

export default MyStar;
