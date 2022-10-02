import React, { useState, useEffect } from 'react';
import { RiMessage3Line, RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import CommentInput from './CommentInput';
import UseAxios from '../../utils/UseAxios';
import { useLocation } from 'react-router-dom';
import CommentList from './CommentList';

function CoummnityFooter(props) {
  const location = useLocation();
  const [commentData, setCommentData] = useState(null);
  const [like, setLike] = useState(null);
  const [commentCnt, setCommentCnt] = useState(null);
  const [checkWrite, setCheckWrite] = useState(false);
  const [replyCheck, setReplyCheck] = useState(null);

  useEffect(() => {
    UseAxios.get(
      `/communities/stars/${location.state.starId}/boards/${location.state.boardId}/comments`
    ).then((res) => {
      setCommentData(res.data);
    });
    if (props.data) {
      setLike({
        likeCnt: props.data.communityDTO.likeCnt,
        liked: props.data.communityDTO.liked,
      });
      setCommentCnt(props.data.communityDTO.commentCnt);
    }
  }, []);

  useEffect(() => {
    if (checkWrite) {
      UseAxios.get(
        `/communities/stars/${location.state.starId}/boards/${location.state.boardId}/comments`
      ).then((res) => {
        setCommentData(res.data);
      });
      if (props.data) {
        setLike({
          likeCnt: props.data.communityDTO.likeCnt,
          liked: props.data.communityDTO.liked,
        });
        setCommentCnt(props.data.communityDTO.commentCnt);
      }
    }
  }, [checkWrite]);

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

  return commentData ? (
    <>
      <div className={props.styles.footerWrapper}>
        <span style={{ marginRight: 10 }}>
          <span style={{ marginRight: 5 }}>
            <RiMessage3Line></RiMessage3Line>
          </span>
          <span>{commentCnt ? commentCnt : 0}</span>
        </span>
        <span>
          <span onClick={likeButtonClick} style={{ marginRight: 5 }}>
            {like ? like.liked ? <RiHeart2Fill></RiHeart2Fill> : <RiHeart2Line></RiHeart2Line> : ''}
          </span>
          <span>{like ? like.likeCnt : 0}</span>
        </span>
      </div>
      <div>
        <CommentInput
          styles={props.styles}
          commentData={commentData}
          setCommentData={setCommentData}
          commentCnt={commentCnt}
          setCommentCnt={setCommentCnt}
          checkWrite={checkWrite}
          setCheckWrite={setCheckWrite}
        ></CommentInput>
        <CommentList styles={props.styles} commentData={commentData}></CommentList>
      </div>
    </>
  ) : (
    ''
  );
}

export default CoummnityFooter;
