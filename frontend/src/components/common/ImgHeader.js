import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import styles from './ImgHeader.module.css';

function ImgHeader(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.topBox}>
      <div className={styles.sideBox}>
        <BiArrowBack size={25} color={'#FFFFFF'} onClick={() => navigate(-1)}></BiArrowBack>
      </div>
      <div className={props.white ? styles.pageWhiteTitle : styles.pageTitle}>{props.title}</div>
      <div className={styles.sideBox}></div>
    </div>
  );
}

export default ImgHeader;
