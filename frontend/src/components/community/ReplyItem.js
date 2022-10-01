import React, { useEffect, useState } from 'react';
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import UseAxios from '../../utils/UseAxios';
import TimeForToday from '../common/TimeForToday';
import { useLocation } from 'react-router-dom';

function ReplyItem(props) {
  const location = useLocation();
  const [item, setItem] = useState(null);
  const [like, setLike] = useState(null);
  const [toggle, setToggle] = useState(false);
  const newDate = new Date(props.item.reg);
  useEffect(() => {
    if (props.item) {
      setItem(props.item);
      setLike({
        likeCnt: props.item.likeCnt,
        liked: props.item.liked,
      });
    }
  }, [props.item]);

  const likeButtonClick = () => {
    if (!like.liked) {
      setLike((like) => ({
        ...like,
        liked: true,
        likeCnt: like.likeCnt + 1,
      }));
      UseAxios.post(
        `/communities/stars/${location.state.starId}/boards/${location.state.boardId}/comments/${props.item.id}`
      );
    } else if (like.liked) {
      setLike((like) => ({
        ...like,
        liked: false,
        likeCnt: like.likeCnt - 1,
      }));
      UseAxios.delete(
        `/communities/stars/${location.state.starId}/boards/${location.state.boardId}/comments/${props.item.id}`
      );
    }
  };

  return item ? (
    <div style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
      <div>
        {item.user.profileImg ? (
          <img
            alt='writer'
            className={props.styles.commentImg}
            src={`/files/${item.user.profileImg}`}
          ></img>
        ) : (
          <div style={{ width: '40px', height: '40px' }}></div>
        )}
      </div>
      <div style={{ flex: 10, alignItems: 'center', marginLeft: 10 }}>
        <div>
          {item.user.nickname}{' '}
          <span className={props.styles.writeDate}>{TimeForToday(newDate)}</span>
        </div>
        <div>{item.content}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={props.styles.writeDate}>답글 달기 </span>
          <span
            className={props.styles.writeDate}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            {toggle ? '답글 숨기기' : '답글 보기'}
          </span>
        </div>
      </div>
      <div>
        <span onClick={likeButtonClick}>
          {like ? like.liked ? <RiHeart2Fill></RiHeart2Fill> : <RiHeart2Line></RiHeart2Line> : ''}
        </span>
        <div>{like ? like.likeCnt : 0}</div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ReplyItem;
