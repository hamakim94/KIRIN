import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.topBox}>
      <div className={styles.sideBox}>
        <BiArrowBack size={25} color={'#000000'} onClick={() => navigate(-1)}></BiArrowBack>
      </div>
      <div className={styles.pageTitle}>{props.title}</div>
      <div className={styles.sideBox}></div>
    </div>
  );
}

export default Header;
