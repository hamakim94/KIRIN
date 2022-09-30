import React, { useState, useEffect } from 'react';
import { RiMessage3Line, RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import CommentInput from './CommentInput';
import UseAxios from '../../utils/UseAxios';
import { useLocation } from 'react-router-dom';
function CoummnityFooter(props) {
  const location = useLocation();
  const [commentData, setCommentData] = useState(null);
  const [like, setLike] = useState(null);
  const [commentCnt, setCommentCnt] = useState(null);
  const [replyCheck, setReplyCheck] = useState(null);
  useEffect(() => {
    if (props.data) {
      setCommentData(props.data.commentList);
      setLike({
        likeCnt: props.data.communityDTO.likeCnt,
        liked: props.data.communityDTO.liked,
      });
      setCommentCnt(props.data.communityDTO.commentCnt);
    }
  }, [props.data]);

  const likeButtonClick = () => {
    if (!like.liked) {
      UseAxios.post(`/communities/stars/${location.state.starId}/boards/${location.state.boardId}`)
        .then((res) => {
          setLike((like) => ({
            ...like,
            liked: !like.liked,
            likeCnt: like.likeCnt + 1,
          }));
          console.log('좋아용');
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (like.liked) {
      UseAxios.delete(
        `/communities/stars/${location.state.starId}/boards/${location.state.boardId}`
      )
        .then((res) => {
          setLike((like) => ({
            ...like,
            liked: !like.liked,
            likeCnt: like.likeCnt - 1,
          }));
          console.log('싫어용');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className={props.styles.footerWrapper}>
        <RiMessage3Line></RiMessage3Line>
        {commentCnt ? commentCnt : 0}
        <span onClick={likeButtonClick}>
          {like ? like.liked ? <RiHeart2Fill></RiHeart2Fill> : <RiHeart2Line></RiHeart2Line> : ''}
        </span>
        {like ? like.likeCnt : 0}
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
