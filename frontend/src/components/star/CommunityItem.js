import React, { useEffect, useState } from 'react';
import { RiMessage3Line, RiHeart2Fill, RiHeart2Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import CommunityWriter from '../community/CommunityWriter';

function CommunityItem(props) {
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
        <CommunityWriter styles={props.styles} data={props.item}></CommunityWriter>
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
        <div>
          <RiMessage3Line></RiMessage3Line>
          {itemData.commentCnt}
          {itemData.liked ? <RiHeart2Fill></RiHeart2Fill> : <RiHeart2Line></RiHeart2Line>}
          {itemData.likeCnt}
        </div>
      </div>
    </div>
  ) : (
    '로딩'
  );
}

export default CommunityItem;
