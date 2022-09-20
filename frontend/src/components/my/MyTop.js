import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function MyTop(props) {
  return (
    <div className={props.styles.topBox}>
      <a>
        <BiArrowBack className={props.styles.back}></BiArrowBack>
      </a>
      <div className={props.styles.pageTitle}>마이페이지</div>
      <a href="/mypage/setting">
        <AiFillSetting className={props.styles.setting}></AiFillSetting>
      </a>
    </div>
  );
}

export default MyTop;
