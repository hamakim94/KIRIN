import React from 'react';
import CommunityItem from './CommunityItem';

function CommunityList(props) {
  return (
    <div className={props.styles.hScroll}>
      {props.data
        ? props.data.map((item, index) => (
            <CommunityItem styles={props.styles} item={item} index={index} key={item.id} />
          ))
        : ''}
    </div>
  );
}

export default CommunityList;
