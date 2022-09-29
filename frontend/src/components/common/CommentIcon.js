import React from 'react';
import { RiMessage3Line } from 'react-icons/ri';
function CommentIcon(props) {
  return (
    <>
      <RiMessage3Line></RiMessage3Line>
      <span>{props.cnt}</span>
    </>
  );
}

export default CommentIcon;
