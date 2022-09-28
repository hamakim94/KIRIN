import React from 'react';
import Header from '../components/common/Header';
import CommunityComment from '../components/community/CommunityComment';
import CommunityContent from '../components/community/CommunityContent';
import CommunityWriter from '../components/community/CommunityWriter';
import CoummnityFooter from '../components/community/CoummnityFooter';
import styles from './CommunityPage.module.css';
function CommunityPage() {
  return (
    <div className='wrapper'>
      <Header title={'새콤달콤'}></Header>
      <CommunityWriter styles={styles}></CommunityWriter>
      <CommunityContent styles={styles}></CommunityContent>
      <CoummnityFooter styles={styles}></CoummnityFooter>
      <CommunityComment styles={styles}></CommunityComment>
    </div>
  );
}

export default CommunityPage;
