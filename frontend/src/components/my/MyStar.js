import React, { useEffect, useState } from 'react';
import Subscribe from './Subscribe.json';
import UseAxios from '../../utils/UseAxios';

function MyStar(props) {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    UseAxios.get(`/users/subscribes`).then((res) => {
      setSubs(res.data);
    });
  });

  return (
    <div>
      <div className={props.styles.myTitle}>나의 스타</div>
      <div className={props.styles.hScroll}>
        <div className={props.styles.starList}>
          {subs.map((sub) => (
            <div className={props.styles.profileImgName}>
              <img src={sub.profileImg} className={props.styles.starImg}></img>
              <div className={props.styles.starName}>{sub.nickname}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyStar;
