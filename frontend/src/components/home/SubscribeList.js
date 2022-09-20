import React from "react";
import MyStar from "./MyStar";
import { useNavigate } from "react-router-dom";

function SubscribeList(props) {
  const navigate = useNavigate();
  const starData = [];
  for (let i = 0; i < 10; i++) {
    starData.push(<MyStar styles={props.styles} key={i}></MyStar>);
  }
  return (
    <div className={props.styles.hScroll}>
      <div className={props.styles.plusStar} onClick={() => navigate(`/search`)}>
        <div className={props.styles.plusStarBox}>
          <span className={props.styles.plusStarText}>+</span>
        </div>
      </div>
      {starData}
    </div>
  );
}

export default SubscribeList;
