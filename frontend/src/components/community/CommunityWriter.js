import React from "react";
import TimeForToday from "../common/TimeForToday";

function CommunityWriter(props) {
  return (
    <div className={props.styles.writerWrapper}>
      <div>
        <img
          alt='star'
          className={props.styles.starImg}
          src='https://cdn.pixabay.com/photo/2022/05/06/17/15/cartoon-giraffe-7178753_960_720.jpg'
        ></img>
      </div>
      <div className={props.styles.nameWrapper}>
        <b>NAYEON</b>
        <span className={props.styles.writeDate}>{TimeForToday(Date.now())}</span>
      </div>
    </div>
  );
}

export default CommunityWriter;
