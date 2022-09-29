import React, { useContext, useEffect, useRef, useState } from 'react';
import ChallengeList from '../components/home/ChallengeList';
import HomeCategory from '../components/home/HomeCategory';
import CommunityItem from '../components/star/CommunityItem';
import styles from './StarPage.module.css';
import UseAxios from '../utils/UseAxios';
import Context from '../utils/Context';
import { Avatar } from '@mui/material';
import StarPageModal from '../components/star/StarPageModal';

function StarPage() {
  const [starInfo, setStarInfo] = useState({});
  const { userData } = useContext(Context);
  const fileInput = useRef(null);
  const [coverImg, setCoverImg] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [info, setInfo] = useState('');
  useEffect(() => {
    const location = window.location.href.split('/');
    const starId = Number(location[location.length - 1]);
    UseAxios.get(`/users/stars/${starId}`).then((res) => {
      setStarInfo(res.data);
      setCoverImg(`/files/${res.data.coverImg}`);
      setInfo(res.data.info.replaceAll('"', ''));
    });
    UseAxios.get(`/users/subscribes`).then((res) => {
      if (res.data.findIndex((stars) => stars.id === starId) > -1) {
        setSubscribed(true);
      }
    });
  }, []);

  const onChange = (e) => {
    if (e.target.files[0]) {
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
    };
    reader.readAsDataURL(e.target.files[0]);
    changeImg(e.target.files[0]);
  };

  const changeImg = (obj) => {
    const data = new FormData();
    data.append('coverImg', obj);
    console.log(obj);
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

  const subscribe = () => {
    UseAxios.post(
      `/users/subscribes`,
      {},
      {
        params: { celebId: starInfo.id },
      }
    )
      .then((res) => {
        console.log(res);
        setSubscribed(!subscribed);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='wrapper'>
      <div className={styles.topWrapper}>
        {/* 커버사진 */}
        {userData.id === starInfo.id ? (
          <div>
            {' '}
            <Avatar
              src={coverImg}
              style={{
                height: '150px',
                width: '100%',
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
          </div>
        ) : (
          <div>
            {' '}
            <Avatar
              src={coverImg}
              style={{
                height: '150px',
                width: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              variant='square'
              alt='cover'
            ></Avatar>
          </div>
        )}
        <div
          style={{
            position: 'absolute',
            left: '15px',
            bottom: '0',
            backgroundImage: `url(/files/${starInfo.profileImg})`,
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
        {userData.id === starInfo.id ? (
          <></>
        ) : subscribed ? (
          <div className={styles.btnWrapper}>
            <button className={styles.unSubBtn} onClick={subscribe}>
              구독취소
            </button>
          </div>
        ) : (
          <div className={styles.btnWrapper}>
            <button className={styles.subBtn} onClick={subscribe}>
              구독
            </button>
          </div>
        )}
      </div>
      {userData.id === starInfo.id ? (
        <StarPageModal info={info} setInfo={setInfo} styles={styles}></StarPageModal>
      ) : (
        <div className={styles.contentBox}>{starInfo.info ? starInfo.info : '없졍'}</div>
      )}

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
