import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import Marquee from './Marquee.js';

function Header(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.topBox}>
      <div className={styles.sideBox}>
        <BsChevronLeft
          size={25}
          color={props.white ? '#FFFFFF' : '#000000'}
          onClick={() => navigate(-1)}
        ></BsChevronLeft>
      </div>
      <div className={props.white ? styles.pageWhiteTitle : styles.pageTitle}>{props.title}</div>
      <div className={styles.rightBox}></div>
    </div>
  );
}

export default Header;
