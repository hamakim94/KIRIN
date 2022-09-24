import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function FindPasswordTop(props) {
  return (
    <div className={props.styles.topBox}>
      <a href="/login">
        <BiArrowBack className={props.styles.back}></BiArrowBack>
      </a>
      <div className={props.styles.pageTitle}>비밀번호 찾기</div>
      <a href="">
        <AiFillSetting className={props.styles.fakeSetting}></AiFillSetting>
      </a>
    </div>
  );
}

export default FindPasswordTop;
