import React from "react";
import MyStar from "./MyStar";
function SubscribeList(props) {
  const starData = [];
  for (let i = 0; i < 10; i++) {
    starData.push(<MyStar styles={props.styles} key={i}></MyStar>);
  }
  return <div className={props.styles.hScroll}>{starData}</div>;
}

export default SubscribeList;
