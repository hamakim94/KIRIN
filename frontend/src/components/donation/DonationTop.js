import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function DontaionTop(props) {
  return (
    <div className={props.styles.topBox}>
      <a>
        <BiArrowBack className={props.styles.back}></BiArrowBack>
      </a>
      <div className={props.styles.pageTitle}>나의 기부</div>
      <div style={{ width: 25 }}></div>
    </div>
  );
}

export default DontaionTop;
