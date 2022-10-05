import React, { useEffect, useState } from 'react';
import { RiMessage3Line, RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import TimeForToday from '../common/TimeForToday';
import ProfileImg from '../common/ProfileImg';
import { FaRegHeart, FaHeart, FaRegCommentAlt } from 'react-icons/fa';

function CommunityItem(props) {
  const newDate = new Date(props.item.reg);
  const [itemData, setItemData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.item) {
      setItemData(props.item);
    }
  }, [props.item]);

  return itemData ? (
    <div
      className={props.styles.communityItem}
      onClick={() =>
        navigate(`/star/${itemData.user.id}/community/${itemData.id}`, {
          state: {
            starId: itemData.user.id,
            boardId: itemData.id,
          },
        })
      }
    >
      <div style={{ margin: 15 }}>
        <div className={props.styles.writerWrapper}>
          <div style={{ marginRight: 10 }}>
            <ProfileImg src={props.item.user.profileImg} size={'45px'} />
          </div>
          <div style={{ width: '100%' }}>
            <div style={{ fontWeight: 'bold' }}>{props.item.user.nickname}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={props.styles.writeDate}>{TimeForToday(newDate)}</div>
              <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', marginRight: 10 }}>
                  <span style={{ marginRight: 3 }}>
                    {itemData.liked ? (
                      <FaHeart size='16' color='#FF5F5F'></FaHeart>
                    ) : (
                      <FaRegHeart size='16'></FaRegHeart>
                    )}
                  </span>
                  <span>{itemData.likeCnt}</span>
                </div>
                <div style={{ display: 'flex' }}>
                  <span style={{ marginRight: 3 }}>
                    <FaRegCommentAlt size='16'></FaRegCommentAlt>
                  </span>
                  <span>{itemData.commentCnt}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span
            style={{
              whiteSpace: 'nowrap',
              width: '70%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: 13,
            }}
          >
            {itemData.content}
          </span>
          <span style={{ fontSize: 12, color: '#808080' }}>
            {itemData.content.length > 15 ? '자세히보기' : ''}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <img
            alt='star'
            className={props.styles.communityImg}
            src={`/files/${itemData.img}`}
          ></img>
        </div>
      </div>
    </div>
  ) : (
    '로딩'
  );
}

export default CommunityItem;
