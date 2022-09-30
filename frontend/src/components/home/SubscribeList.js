import React, { useEffect, useState } from 'react';
import MyStar from './MyStar';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../utils/UseAxios';

function SubscribeList(props) {
  const navigate = useNavigate();
  const [starData, setStarData] = useState(null);
  // for (let i = 0; i < 10; i++) {
  //   starData.push(<MyStar styles={props.styles} key={i}></MyStar>);
  // }
  useEffect(() => {
    UseAxios.get(`/users/subscribes`).then((res) => {
      console.log(res);
      setStarData(res.data);
    });
  }, []);

  return (
    <div className={props.styles.hScroll}>
      <div className={props.styles.plusStar} onClick={() => navigate(`/search`)}>
        <div className={props.styles.plusStarBox}>
          <span className={props.styles.plusStarText}>+</span>
        </div>
      </div>
      {starData
        ? starData.map((item, index) => (
            <MyStar styles={props.styles} item={item} index={index} key={item.id} />
          ))
        : ''}
    </div>
  );
}

export default SubscribeList;
