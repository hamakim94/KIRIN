import React from 'react';
import { BsChevronLeft, BsGearFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function MyTop(props) {
  const navigate = useNavigate();
  return (
    <div className={props.styles.topBox}>
      <BsChevronLeft
        className={props.styles.back}
        onClick={() => {
          props.state ? navigate('/') : navigate(-1);
        }}
      ></BsChevronLeft>
      <div className={props.styles.pageTitle}>마이페이지</div>
      <BsGearFill
        className={props.styles.setting}
        onClick={() => navigate('./setting')}
      ></BsGearFill>
    </div>
  );
}

export default MyTop;
