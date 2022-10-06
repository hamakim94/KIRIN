import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import UseAxios from '../../utils/UseAxios';
import TimeForToday from '../common/TimeForToday';
import ProfileImg from '../common/ProfileImg';

function CommentItem(props) {
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
      UseAxios.post(`/challenges/comments/${props.item.id}`);
    } else if (like.liked) {
      setLike((like) => ({
        ...like,
        liked: false,
        likeCnt: like.likeCnt - 1,
      }));
      UseAxios.delete(`/challenges/comments/${props.item.id}`);
    }
  };

  return item ? (
    <div
      style={{
        display: 'flex',
        // alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottom: 'solid 1px #c2c2c2',
      }}
    >
      <div style={{ marginLeft: 10, paddingTop: 5 }}>
        <ProfileImg src={item.user.profileImg} size={'40px'} />
      </div>
      <div style={{ flex: 10, alignItems: 'center', marginLeft: 15, fontSize: 'smaller' }}>
        <div style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.user.nickname}</div>
        <div style={{ marginBottom: 4 }}>{item.content}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={props.styles.writeDate} style={{ marginRight: 15 }}>
            {TimeForToday(newDate)}
          </span>
        </div>
      </div>
      <div style={{ paddingTop: 8, textAlign: 'center', marginRight: 15 }}>
        <div onClick={likeButtonClick}>
          {like ? like.liked ? <FaHeart color='#FF5F5F'></FaHeart> : <FaRegHeart></FaRegHeart> : ''}
        </div>
        <div style={{ fontSize: 12 }}>{like ? like.likeCnt : 0}</div>
      </div>
    </div>
  ) : (
    ''
  );
}

function SavanaCommentList(props) {
  return (
    <div>
      {props.commentData
        ? props.commentData.map((item) => (
            <CommentItem styles={props.styles} item={item} key={item.id} />
          ))
        : ''}
    </div>
  );
}

export default SavanaCommentList;
