import React from "react";
import CommentIcon from "../common/CommentIcon";
import LikeIcon from "../common/LikeIcon";
import { useNavigate } from "react-router-dom";
function CommunityItem(props) {
  const navigate = useNavigate();
  return (
    <div className={props.styles.communityItem} onClick={() => navigate(`/star/1/community`)}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <div
          style={{
            display: "inline-block",
            borderRadius: "100%",
            width: 50,
            height: 50,
            backgroundColor: "wheat",
          }}
        ></div>
        <span style={{ fontFamily: "SCD500", marginLeft: 10 }}>키위</span>
      </div>
      <div>
        <span style={{ whiteSpace: "normal" }}>
          여러분 안녕하세요 새콤달콤의 키위 현수입니다. 오늘부로 함께하게 되어 정말 신나요! 저소득
          유치원 아이들을 위해 춤추고 기부해요 :)
        </span>
        <div>
          <img
            alt='star'
            className={props.styles.communityImg}
            src='https://cdn.pixabay.com/photo/2022/05/06/17/15/cartoon-giraffe-7178753_960_720.jpg'
          ></img>
        </div>
        <div>
          <CommentIcon></CommentIcon>
          <LikeIcon></LikeIcon>
        </div>
      </div>
    </div>
  );
}

export default CommunityItem;
