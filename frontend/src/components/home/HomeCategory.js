import React from 'react';

function HomeCategory(props) {
  return (
    <div className={props.styles.category}>
      <img
        src={require('../../assets/img/kirin_logo_nobackground.png')}
        style={{ width: 30, marginRight: 5 }}
      ></img>
      <span>{props.title}</span>
    </div>
  );
}

export default HomeCategory;
