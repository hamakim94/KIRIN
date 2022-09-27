import React from 'react';
import CommunityComment from '../components/community/CommunityComment';
import CommunityContent from '../components/community/CommunityContent';
import CommunityHeader from '../components/community/CommunityHeader';
import CommunityWriter from '../components/community/CommunityWriter';
import CoummnityFooter from '../components/community/CoummnityFooter';
import styles from './CommunityPage.module.css';
function CommunityPage() {
  return (
    <div className={styles.wrapper}>
      <CommunityHeader styles={styles}></CommunityHeader>
      <CommunityWriter styles={styles}></CommunityWriter>
      <CommunityContent styles={styles}></CommunityContent>
      <CoummnityFooter styles={styles}></CoummnityFooter>
      <CommunityComment styles={styles}></CommunityComment>
    </div>
  );
}

export default CommunityPage;
