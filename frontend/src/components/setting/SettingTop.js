import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function MyTop(props) {
  return (
    <div className={props.styles.topBox}>
      <a href="/mypage">
        <BiArrowBack className={props.styles.back}></BiArrowBack>
      </a>
      <div className={props.styles.pageTitle}>설정</div>
      <a>
        <AiFillSetting className={props.styles.fakeSetting}></AiFillSetting>
      </a>
    </div>
  );
}

export default MyTop;
