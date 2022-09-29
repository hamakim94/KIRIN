import React, { useState, useEffect } from 'react';
import CommentIcon from '../common/CommentIcon';
import LikeIcon from '../common/LikeIcon';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
function CoummnityFooter(props) {
  const [commentData, setCommentData] = useState(null);
  useEffect(() => {
    if (props.data) {
      setCommentData(props.data.commentList);
    }
  }, [props.data]);
  console.log(props);
  return (
    <>
      <div className={props.styles.footerWrapper}>
        <LikeIcon cnt={props.data.communityDTO.likeCnt}></LikeIcon>
        <CommentIcon cnt={props.data.communityDTO.commentCnt}></CommentIcon>
      </div>
      <div>
        <CommentInput
          styles={props.styles}
          commentData={commentData}
          setCommentData={setCommentData}
        ></CommentInput>
        {/* <CommentList styles={props.styles} commentData={commentData}></CommentList> */}
      </div>
    </>
  );
}

export default CoummnityFooter;
