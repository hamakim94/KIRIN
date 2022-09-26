import React, { useState, useRef } from 'react';
import swal from 'sweetalert';
import UseAxios from '../../utils/UseAxios';

function SettingMenu(props) {
  const [willLogout, setWillLogout] = useState([]);

  const logout = () => {
    swal({
      text: '로그아웃 하시겠습니까?',
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        UseAxios.get(`/users/logout`);
        swal('로그아웃이 완료되었습니다.');
      } else {
      }
      console.log('로그아웃');
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
