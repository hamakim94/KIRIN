import React from 'react';

function CommunityContent(props) {
  console.log(props.data);
  return (
    <div className={props.styles.midWrapper}>
      <div>{props.data.content}</div>
      <div>
        <img
          alt='star'
          className={props.styles.communityImg}
          src={`/files/${props.data.img}`}
        ></img>
      </div>
    </div>
  );
}

export default CommunityContent;
