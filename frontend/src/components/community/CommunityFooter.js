import React, { useState, useEffect } from 'react';
import CommentInput from './CommentInput';
import UseAxios from '../../utils/UseAxios';
import { useLocation } from 'react-router-dom';
import CommentList from './CommentList';
import { FaRegHeart, FaHeart, FaRegCommentAlt } from 'react-icons/fa';

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
      const latestArr = res.data.reverse();
      setCommentData(latestArr);
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
    if (!checkWrite) {
      UseAxios.get(
        `/communities/stars/${location.state.starId}/boards/${location.state.boardId}/comments`
      ).then((res) => {
        const latestArr = res.data.reverse();
        setCommentData(latestArr);
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
        })
        .catch((err) => {
          // console.log(err);
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
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  return commentData ? (
    <>
      <div className={props.styles.footerWrapper}>
        <div style={{ display: 'flex', marginRight: 10 }}>
          <span onClick={likeButtonClick} style={{ marginRight: 5 }}>
            {like ? (
              like.liked ? (
                <FaHeart size='16' color='#FF5F5F'></FaHeart>
              ) : (
                <FaRegHeart size='16'></FaRegHeart>
              )
            ) : (
              ''
            )}
          </span>
          <span style={{ fontSize: 16 }}>{like ? like.likeCnt : 0}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <span style={{ marginRight: 5 }}>
            <FaRegCommentAlt size='16'></FaRegCommentAlt>
          </span>
          <span style={{ fontSize: 16 }}>{commentCnt ? commentCnt : 0}</span>
        </div>
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
