import React from 'react';
import CommentItem from './CommentItem';

function CommentList(props) {
  return (
    <div>
      {props.commentData.map((item) => (
        <CommentItem styles={props.styles} item={item} key={item.id} />
      ))}
    </div>
  );
}

export default CommentList;
