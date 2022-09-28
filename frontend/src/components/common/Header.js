import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.topBox}>
      <div className={styles.sideBox}>
        <BiArrowBack
          size={25}
          color={props.white ? '#FFFFFF' : '#000000'}
          onClick={() => navigate(-1)}
        ></BiArrowBack>
      </div>
      <div className={props.white ? styles.pageWhiteTitle : styles.pageTitle}>{props.title}</div>
      <div className={styles.sideBox}></div>
    </div>
  );
}

export default Header;
