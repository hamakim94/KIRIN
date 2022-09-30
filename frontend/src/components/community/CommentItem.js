import React, { useEffect, useState } from 'react';
import TimeForToday from '../common/TimeForToday';

function CommentItem(props) {
  const [item, setItem] = useState(null);
  const newDate = new Date(props.item.reg);
  useEffect(() => {
    if (props.item) {
      setItem(props.item);
      console.log(props.item);
    }
  }, [props.item]);

  return item ? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <img
          alt='writer'
          className={props.styles.commentImg}
          src={`/files/${item.user.profileImg}`}
        ></img>
      </div>
      <div style={{ flex: 10, alignItems: 'center', marginLeft: 10 }}>
        <div>
          {item.user.nickname}{' '}
          <span className={props.styles.writeDate}>{TimeForToday(newDate)}</span>
        </div>
        <div>{item.content}</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={props.styles.writeDate}>답글 달기</span>
          <span className={props.styles.writeDate}>답글 보기</span>
        </div>
      </div>
      <div>
        <div>하트</div>
        <div>숫자</div>
      </div>
    </div>
  ) : (
    ''
  );
}

export default CommentItem;
