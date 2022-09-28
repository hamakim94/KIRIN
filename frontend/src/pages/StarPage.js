import React from 'react';
import ChallengeList from '../components/home/ChallengeList';
import HomeCategory from '../components/home/HomeCategory';
import CommunityItem from '../components/star/CommunityItem';
import styles from './StarPage.module.css';

function StarPage() {
  return (
    <div className='wrapper'>
      <div className={styles.topWrapper}>
        <div className={styles.coverImg}></div> {/* 커버사진 */}
        <div className={styles.starImg}></div> {/* 프로필사진 */}
      </div>
      <div className={styles.topTitle}>
        <div className={styles.starName}>
          <span>기린기린</span>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.subBtn}>구독</button>
        </div>
      </div>
      <div className={styles.contentBox}>안녕하세요 새콤달콤입니다. 함께 기부해요~!!</div>
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
