import React, { useEffect, useState } from 'react';
import { RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import UseAxios from '../../utils/UseAxios';
import TimeForToday from '../common/TimeForToday';
import { useLocation } from 'react-router-dom';
import ProfileImg from '../common/ProfileImg';

function CommentItem(props) {
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: 'solid 1px #c2c2c2',
      }}
    >
      <div>
        <ProfileImg src={item.user.profileImg} size={'40px'} />
      </div>
      <div style={{ flex: 10, alignItems: 'center', marginLeft: 10, fontSize: 'smaller' }}>
        <div style={{ marginBottom: 5, fontWeight: 'bold' }}>{item.user.nickname}</div>
        <div style={{ marginBottom: 5 }}>{item.content}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={props.styles.writeDate} style={{ marginRight: 15 }}>
            {TimeForToday(newDate)}
          </span>
          <span className={props.styles.writeDate} style={{ marginRight: 8 }}>
            답글 달기
          </span>
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
      <div style={{ textAlign: 'center' }}>
        <div onClick={likeButtonClick}>
          {like ? like.liked ? <RiHeart2Fill></RiHeart2Fill> : <RiHeart2Line></RiHeart2Line> : ''}
        </div>
        <div>{like ? like.likeCnt : 0}</div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default CommentItem;
