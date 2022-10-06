import React from 'react';
import { RiHeart2Fill } from 'react-icons/ri';
function LikeIcon(props) {
  return (
    <>
      <RiHeart2Fill></RiHeart2Fill>
      <span>{props.cnt}</span>
    </>
  );
}

export default LikeIcon;
