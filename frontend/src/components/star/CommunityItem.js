import React, { useEffect, useState } from 'react';
import { RiMessage3Line, RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import TimeForToday from '../common/TimeForToday';
import ProfileImg from '../common/ProfileImg';

function CommunityItem(props) {
  const newDate = new Date(props.item.reg);
  const [itemData, setItemData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.item) {
      setItemData(props.item);
      console.log(props.item);
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
              <div>
                <span style={{ marginRight: '5px' }}>
                  <RiMessage3Line></RiMessage3Line>
                  {itemData.commentCnt}
                </span>
                <span>
                  {itemData.liked ? <RiHeart2Fill></RiHeart2Fill> : <RiHeart2Line></RiHeart2Line>}
                  {itemData.likeCnt}
                </span>
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
