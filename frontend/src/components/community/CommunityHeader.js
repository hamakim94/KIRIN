import React from "react";
import BackButton from "../common/BackButton";
function CommunityHeader(props) {
  return (
    <div className={props.styles.topWrapper}>
      <div>
        <BackButton></BackButton>
      </div>
      <div>
        <span>새콤달콤</span>
      </div>
    </div>
  );
}

export default CommunityHeader;
