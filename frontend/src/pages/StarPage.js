import React, { useContext, useEffect, useRef, useState } from 'react';
import ChallengeList from '../components/home/ChallengeList';
import HomeCategory from '../components/home/HomeCategory';
import CommunityItem from '../components/star/CommunityItem';
import styles from './StarPage.module.css';
import swal from 'sweetalert';
import UseAxios from '../utils/UseAxios';
import Context from '../utils/Context';
import { Avatar } from '@mui/material';

function StarPage() {
  const [starInfo, setStarInfo] = useState({});
  const { userData } = useContext(Context);
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  const [coverImg, setCoverImg] = useState(null);

  useEffect(() => {
    const location = window.location.href.split('/');
    const starId = Number(location[location.length - 1]);
    console.log(starId);
    UseAxios.get(`/users/stars/${starId}`).then((res) => {
      setStarInfo(res.data);
      setCoverImg(res.data.coverImg);
      console.log(res.data.coverImg);
    });
  }, []);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시

      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCoverImg(reader.result);
      }
      console.log(starInfo.coverImg);
    };
    reader.readAsDataURL(e.target.files[0]);
    changeImg()
      .then(() => swal('배경화면 수정이 완료되었습니다.'))
      .catch((err) => console.log(err));
  };

  const changeImg = async () => {
    const data = new FormData();
    data.append('coverImg', file);
    console.log(data);
    UseAxios.put(`/users/change-cover`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='wrapper'>
      <div className={styles.topWrapper}>
        {/* 커버사진 */}
        <Avatar
          src={`${process.env.REACT_APP_BASEURL}/files/${coverImg}`}
          style={{
            height: '150px',
            width: '100%',
            // backgroundImage: `${process.env.REACT_APP_BASEURL}/files/${starInfo.backgroundImage}`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          variant='square'
          onClick={() => {
            fileInput.current.click();
          }}
        ></Avatar>
        <form>
          <input
            type='file'
            style={{ display: 'none' }}
            accept='image/jpg,image/png,image/jpeg'
            name='coverImg'
            onChange={onChange}
            ref={fileInput}
          ></input>
        </form>
        <div
          style={{
            position: 'absolute',
            left: '15px',
            bottom: '0',
            backgroundImage: `url(${process.env.REACT_APP_BASEURL}/files/${starInfo.profileImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '100%',
            width: '100px',
            height: '100px',
            border: '1px solid rgba(0,0,0)',
          }}
        ></div>{' '}
        {/* 프로필사진 */}
      </div>
      <div className={styles.topTitle}>
        <div className={styles.starName}>
          <span>{starInfo.nickname}</span>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.subBtn}>구독</button>
        </div>
      </div>
      <div className={styles.contentBox}>{starInfo.info ? starInfo.info : '없졍'}</div>
      <div className={styles.titleBox}>
        <HomeCategory title={'챌린지'} styles={styles}></HomeCategory>
        <div className={styles.sortTab}>
          <span>최신순</span>
          <span>인기순</span>
        </div>
      </div>
      <ChallengeList styles={styles}></ChallengeList>
      <div className={styles.titleBox}>
        <HomeCategory title={'커뮤니티'} styles={styles}></HomeCategory>
      </div>
      <div className={styles.hScroll}>
        <CommunityItem styles={styles}></CommunityItem>
        <CommunityItem styles={styles}></CommunityItem>
        <CommunityItem styles={styles}></CommunityItem>
        <CommunityItem styles={styles}></CommunityItem>
      </div>
    </div>
  );
}

export default StarPage;
