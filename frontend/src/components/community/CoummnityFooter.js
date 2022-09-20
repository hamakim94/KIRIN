import React from "react";
import CommentIcon from "../common/CommentIcon";
import LikeIcon from "../common/LikeIcon";
function CoummnityFooter(props) {
  return (
    <div className={props.styles.footerWrapper}>
      <LikeIcon></LikeIcon>
      <CommentIcon></CommentIcon>
    </div>
  );
}

export default CoummnityFooter;
