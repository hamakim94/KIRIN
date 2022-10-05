import React, { useEffect, useState } from 'react';
import ProfileImg from '../common/ProfileImg';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../utils/UseAxios';

function SubscribeList(props) {
  const navigate = useNavigate();

  return (
    <div
      className={props.styles.hScroll}
      style={{
        borderBottomStyle: 'solid',
        borderBottomWidth: 0.3,
        borderBottomColor: '#C9C9C9',
        paddingBottom: 8,
      }}
    >
      <div className={props.styles.plusStar} onClick={() => navigate(`/search`)}>
        <div className={props.styles.plusStarBox}>
          <span className={props.styles.plusStarText}>+</span>
        </div>
      </div>
      {props.starData
        ? props.starData.map((item, index) => (
            <ProfileImg
              src={item.profileImg}
              onClick={() => navigate(`/star/${item.id}`)}
              size={'75px'}
              key={item.id}
              left={'15px'}
            />
            // <MyStar styles={props.styles} item={item} index={index} key={item.id} />
          ))
        : ''}
    </div>
  );
}

export default SubscribeList;
