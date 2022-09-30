import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
function MyTop(props) {
  const navigate = useNavigate();
  return (
    <div className={props.styles.topBox}>
      <BiArrowBack className={props.styles.back} onClick={() => navigate(-1)}></BiArrowBack>
      <div className={props.styles.pageTitle}>마이페이지</div>
      <AiFillSetting
        className={props.styles.setting}
        onClick={() => navigate('./setting')}
      ></AiFillSetting>
    </div>
  );
}

export default MyTop;
