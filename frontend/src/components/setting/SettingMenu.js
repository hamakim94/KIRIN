import React, { useContext } from 'react';
// import swal from 'sweetalert';
import swal2 from 'sweetalert2';
import UseAxios from '../../utils/UseAxios';
import Context from '../../utils/Context';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

function SettingMenu(props) {
  const navigate = useNavigate();
  const { setUserData } = useContext(Context);
  const cookies = new Cookies();
  const logout = () => {
    swal2
      .fire({
        title: '로그아웃하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#ffc947',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      })
      .then((res) => {
        if (res.isConfirmed) {
          UseAxios.get(`/users/logout`).then((res) => {
            setUserData(null);
            // swal('로그아웃이 완료되었습니다.');
            swal2
              .fire({
                title: '로그아웃이 완료되었습니다.',
                confirmButtonColor: '#ffc947',
                confirmButtonText: '확인',
              })
              .then((result) => {
                if (result.isConfirmed) {
                  cookies.remove('accesstoken', { path: '/' });
                  cookies.remove('refreshtoken', { path: '/' });
                  navigate('/login');
                }
              });
          });
        }
      });
  };

  return (
    <div>
      <hr></hr>
      <a onClick={() => navigate('/mypage/setting/editprofile')}>
        <div className={props.styles.menuName}>프로필 편집</div>
      </a>
      <hr></hr>
      <a onClick={() => navigate('/mypage/setting/changepassword')}>
        <div className={props.styles.menuName}>비밀번호 변경</div>
      </a>
      <hr></hr>
      <a onClick={() => navigate('/mypage/setting/ask')}>
        <div className={props.styles.menuName}>문의하기</div>
      </a>
      <hr></hr>
      <a onClick={() => navigate('/mypage/setting/termsofservice')}>
        <div className={props.styles.menuName}>서비스 이용약관</div>
      </a>
      <hr></hr>
      <a onClick={() => navigate('/mypage/setting/privacypolicy')}>
        <div className={props.styles.menuName}>개인정보 처리방침</div>
      </a>
      <hr></hr>
      <a onClick={logout}>
        <div className={props.styles.menuName}>로그아웃</div>
      </a>
      <hr></hr>
    </div>
  );
}

export default SettingMenu;
