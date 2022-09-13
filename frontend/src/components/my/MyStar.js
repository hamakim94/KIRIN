import React from 'react';
import Subscribe from './Subscribe.json';

function MyStar(props) {
  return (
    <div>
      <div className={props.styles.myTitle}>나의 스타</div>
      <div className={props.styles.hScroll}>
        <div className={props.styles.starList}>
          {Subscribe.subscribeLists.map((subscribeList) => (
            <div className={props.styles.profileImgName}>
              <img src={subscribeList.img} className={props.styles.starImg}></img>
              <div className={props.styles.starName}>{subscribeList.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyStar;
