import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
function FindPasswordTop(props) {
  const navigate = useNavigate();
  return (
    <div className={props.styles.topBox}>
      <BiArrowBack className={props.styles.back} onClick={() => navigate(-1)}></BiArrowBack>
      <div className={props.styles.pageTitle}>비밀번호 찾기</div>
      <a href=''>
        <AiFillSetting className={props.styles.fakeSetting}></AiFillSetting>
      </a>
    </div>
  );
}

export default FindPasswordTop;
