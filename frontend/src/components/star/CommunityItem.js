import React, { useEffect, useState } from 'react';
import CommentIcon from '../common/CommentIcon';
import LikeIcon from '../common/LikeIcon';
import { useNavigate } from 'react-router-dom';
import CommunityWriter from '../community/CommunityWriter';
function CommunityItem(props) {
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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
        {/* <div
          style={{
            display: 'inline-block',
            borderRadius: '100%',
            width: 50,
            height: 50,
            backgroundImage: `url(/files/${itemData.user.profileImg}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        ></div>
        <span style={{ fontFamily: 'SCD500', marginLeft: 10 }}>{itemData.user.nickname}</span> */}
        <CommunityWriter styles={props.styles} data={props.item}></CommunityWriter>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
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
        <div>
          <img
            alt='star'
            className={props.styles.communityImg}
            src={`/files/${itemData.img}`}
          ></img>
        </div>
        <div>
          <CommentIcon cnt={itemData.commentCnt}></CommentIcon>
          <LikeIcon cnt={itemData.likeCnt}></LikeIcon>
        </div>
      </div>
    </div>
  ) : (
    '로딩'
  );
}

export default CommunityItem;
