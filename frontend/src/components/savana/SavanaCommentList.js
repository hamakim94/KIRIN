import React from 'react';
import TimeForToday from '../common/TimeForToday';

function CommentItem(props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div>
        <img
          alt="writer"
          className={props.styles.commentImg}
          src="https://cdn.pixabay.com/photo/2022/05/06/17/15/cartoon-giraffe-7178753_960_720.jpg"
        ></img>
      </div>
      <div style={{ flex: 10, alignItems: 'center', marginLeft: 10 }}>
        <div>
          이름 <span className={props.styles.writeDate}>{TimeForToday(Date.now())}</span>
        </div>
        <div>{props.item.content}</div>
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
  );
}
function SavanaCommentItem(props) {
  return (
    <div>
      {props.commentData.map((item) => (
        <CommentItem styles={props.styles} item={item} key={item.id} />
      ))}
    </div>
  );
}

export default SavanaCommentItem;
