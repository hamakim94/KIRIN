import React, { useContext, useEffect, useRef, useState } from 'react';
import ChallengeList from '../components/home/ChallengeList';
import Category from '../components/common/Category';
import styles from './StarPage.module.css';
import UseAxios from '../utils/UseAxios';
import Context from '../utils/Context';
import { Avatar } from '@mui/material';
import StarPageModal from '../components/star/StarPageModal';
import { useNavigate } from 'react-router-dom';
import CommunityList from '../components/star/CommunityList';

function StarPage() {
  const [starInfo, setStarInfo] = useState({});
  const { userData } = useContext(Context);
  const fileInput = useRef(null);
  const [coverImg, setCoverImg] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [info, setInfo] = useState('');
  const [popularityData, setPopularityData] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [isPopular, setIsPopular] = useState(true);
  const [communityData, setCommunityData] = useState(null);
  const navigate = useNavigate();
  const location = window.location.href.split('/');
  const starId = Number(location[location.length - 1]);

  useEffect(() => {
    UseAxios.get(`/users/stars/${starId}`).then((res) => {
      setStarInfo(res.data);
      console.log(starInfo.profileImg);
      setCoverImg(`/files/${res.data.coverImg}`);
      setInfo(res.data.info);
    });
    UseAxios.get(`/users/subscribes`).then((res) => {
      if (res.data.findIndex((stars) => stars.id === starId) > -1) {
        setSubscribed(true);
      }
    });
    UseAxios.get(`/communities/stars/${starId}`).then((res) => {
      setCommunityData(res.data);
    });
    UseAxios.get(`/challenges?scope=stars&order=latest&userid=${starId}`)
      .then((res) => setLatestData(res.data))
      .catch((err) => console.log(err));
    UseAxios.get(`/challenges?scope=stars&order=popularity&userid=${starId}`)
      .then((res) => {
        setPopularityData(res.data);
      })
      .catch((err) => console.log(err));
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

  return userData && starInfo ? (
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
        <img src={`/files/${starInfo.profileImg}`} className={styles.starImgMain}></img>
        {/* <div
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
            border: '1px solid rgba(0,0,0, 0.3)',
          }}
        ></div>{' '} */}
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
        <Category title={'챌린지'}></Category>
        <div className={styles.sortTab}>
          {isPopular ? (
            <span style={{ color: '#ffc947' }}>최신순</span>
          ) : (
            <span onClick={() => setIsPopular(true)}>최신순</span>
          )}
          {isPopular ? (
            <span onClick={() => setIsPopular(false)}>인기순</span>
          ) : (
            <span style={{ color: '#ffc947' }}>인기순</span>
          )}
        </div>
      </div>
      {isPopular ? (
        <ChallengeList data={latestData}></ChallengeList>
      ) : (
        <ChallengeList data={popularityData}></ChallengeList>
      )}
      <div className={styles.titleBox}>
        <Category title={'커뮤니티'}></Category>
        {userData ? (
          userData.id === starId ? (
            <div style={{ marginRight: 20 }} onClick={() => navigate('community/create')}>
              작성
            </div>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
      <CommunityList data={communityData} styles={styles}></CommunityList>
    </div>
  ) : (
    ''
  );
}

export default StarPage;
