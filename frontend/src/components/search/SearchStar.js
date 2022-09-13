import React from "react";
import { useNavigate } from "react-router-dom";

function SearchStar(props) {
  const navigate = useNavigate();
  return (
    <div className={props.styles.starContainer} onClick={() => navigate(`/star/1`)}>
      <img
        alt='star'
        className={props.styles.starImg}
        src='https://cdn.pixabay.com/photo/2022/05/06/17/15/cartoon-giraffe-7178753_960_720.jpg'
      ></img>
      <span>기린</span>
    </div>
  );
}

export default SearchStar;
