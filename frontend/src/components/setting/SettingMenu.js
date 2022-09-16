import React from 'react';

function SettingMenu(props) {
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
      <a href="">
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
