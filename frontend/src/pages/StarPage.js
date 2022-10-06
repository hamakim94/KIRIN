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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material/';
import ImgHeader from '../components/common/ImgHeader';

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
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffc947',
      },
    },
    typography: {
      fontFamily: 'SCD400',
    },
  });

  useEffect(() => {
    UseAxios.get(`/users/stars/${starId}`).then((res) => {
      setStarInfo(res.data);
      // console.log(starInfo.profileImg);
      setCoverImg(`/files/${res.data.coverImg}`);
      setInfo(res.data.info);
    });
    UseAxios.get(`/users/subscribes`).then((res) => {
      if (res.data.findIndex((stars) => stars.id === starId) > -1) {
        setSubscribed(true);
      }
    });
    UseAxios.get(`/communities/stars/${starId}`).then((res) => {
      res.data.reverse();
      setCommunityData(res.data);
    });
    UseAxios.get(`/challenges?scope=all&order=alphabet`).then((res) => {
      const arr = res.data;
      const filterArr = arr.filter((i) => i.user.id === starId);
      filterArr.reverse();
      filterArr.sort(function (a, b) {
        return b.isProceeding - a.isProceeding;
      });
      setLatestData(filterArr);
    });
    // .catch((err) => console.log(err));
    UseAxios.get(`/challenges?scope=all&order=alphabet`).then((res) => {
      const arr = res.data;
      const filterArr = arr.filter((i) => i.user.id === starId);
      filterArr.sort(function (a, b) {
        return b.likeCnt - a.likeCnt;
      });
      filterArr.sort(function (a, b) {
        return b.isProceeding - a.isProceeding;
      });
      setPopularityData(filterArr);
    });
    // .catch((err) => console.log(err));
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
    UseAxios.put(`/users/change-cover`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {})
      .catch((err) => {});
  };

  const subscribe = () => {
    UseAxios.post(
      `/users/subscribes`,
      {},
      {
        params: { celebId: starInfo.id },
      }
    ).then((res) => {
      // console.log(res);
      setSubscribed(!subscribed);
    });
    // .catch((err) => console.log(err));
  };

  return userData && starInfo ? (
    <ThemeProvider theme={theme}>
      <div className='wrapper'>
        <div className={styles.topWrapper}>
          <ImgHeader></ImgHeader>
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
          <img
            alt={'스타스타'}
            src={
              starInfo.profileImg
                ? `/files/${starInfo.profileImg}`
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            className={styles.starImgMain}
          ></img>
        </div>
        <div className={styles.topTitle}>
          <div className={styles.starName}>
            <span>{starInfo.nickname}</span>
          </div>
        </div>
        {userData.id === starInfo.id ? (
          <StarPageModal info={info} setInfo={setInfo} styles={styles}></StarPageModal>
        ) : (
          <div className={styles.contentBox}>{starInfo.info ? starInfo.info : ''}</div>
        )}
        {userData.id === starInfo.id ? (
          <></>
        ) : subscribed ? (
          <div className={styles.btnWrapper}>
            <Button
              type='button'
              fullWidth
              variant='contained'
              onClick={subscribe}
              size='small'
              style={{ backgroundColor: '#d2d2d2', width: '100%' }}
            >
              구독 취소
            </Button>
          </div>
        ) : (
          <div className={styles.btnWrapper}>
            <Button
              type='button'
              fullWidth
              variant='contained'
              onClick={subscribe}
              size='small'
              style={{ width: '100%' }}
            >
              구독
            </Button>
          </div>
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
          <ChallengeList data={latestData} category={4}></ChallengeList>
        ) : (
          <ChallengeList data={popularityData} category={4}></ChallengeList>
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
    </ThemeProvider>
  ) : (
    ''
  );
}

export default StarPage;
