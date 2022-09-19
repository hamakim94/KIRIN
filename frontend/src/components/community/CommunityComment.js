import React from "react";

function CommunityComment(props) {
  const commentData = ["댓글"];
  return (
    <div>
      <div>로그인한 유저 사진</div>
      <div>
        <input type={"text"} placeholder={"댓글 입력"}></input>
      </div>
      {commentData}
    </div>
  );
}

export default CommunityComment;
