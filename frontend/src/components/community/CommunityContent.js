import React from 'react';

function CommunityContent(props) {
  // console.log(props.data);
  return (
    <div className={props.styles.midWrapper}>
      <div style={{ fontSize: 13 }}>{props.data.content}</div>
      <img alt='star' className={props.styles.communityImg} src={`/files/${props.data.img}`}></img>
    </div>
  );
}

export default CommunityContent;
