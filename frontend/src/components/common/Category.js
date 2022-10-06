import React from 'react';
import styles from './Category.module.css';

function Category(props) {
  return (
    <div className={styles.category}>
      <img
        src={require('../../assets/img/kirin_logo_nobackground.png')}
        style={{ width: 25, marginRight: 5 }}
      ></img>
      <span>{props.title}</span>
    </div>
  );
}

export default Category;
