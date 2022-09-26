import React, { useContext, useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import UseAxios from '../../utils/UseAxios';
import Context from '../../utils/Context';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function SettingMenu(props) {
  const navigate = useNavigate();
  const { setUserData } = useContext(Context);
  const cookies = new Cookies();
  const logout = () => {
    swal({
      text: '로그아웃 하시겠습니까?',
      dangerMode: true, // ok
      buttons: true, // cancel
    }).then((res) => {
      console.log(res);
      if (res === true) {
        UseAxios.get(`/users/logout`).then((res) => {
          setUserData(null);
          swal('로그아웃이 완료되었습니다.');
          cookies.remove('accesstoken', { path: '/' });
          cookies.remove('refreshtoken', { path: '/' });
          console.log('로그아웃성공');
          navigate('/');
        });
      }
    });
  };

  return (
    <div>
      <hr></hr>
      <a href="/mypage/setting/editprofile">
        <div className={props.styles.menuName}>프로필 편집</div>
      </a>
      <hr></hr>
      <a href="/mypage/setting/changepassword">
        <div className={props.styles.menuName}>비밀번호 변경</div>
      </a>
      <hr></hr>
      <a href="/mypage/setting/ask">
        <div className={props.styles.menuName}>문의하기</div>
      </a>
      <hr></hr>
      <a href="/mypage/setting/termsofservice">
        <div className={props.styles.menuName}>서비스 이용약관</div>
      </a>
      <hr></hr>
      <a href="/mypage/setting/privacypolicy">
        <div className={props.styles.menuName}>개인정보 처리방침</div>
      </a>
      <hr></hr>
      <a onClick={logout}>
        <div className={props.styles.menuName}>로그아웃</div>
      </a>
      <hr></hr>
      <a href="">
        <div className={props.styles.menuName}>회원 탈퇴</div>
      </a>
      <hr></hr>
    </div>
  );
}

export default SettingMenu;
