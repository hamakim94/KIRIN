import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import CommunityContent from '../components/community/CommunityContent';
import CommunityWriter from '../components/community/CommunityWriter';
import CommunityFooter from '../components/community/CommunityFooter';
import UseAxios from '../utils/UseAxios';
import styles from './CommunityPage.module.css';
function CommunityPage() {
  const [data, setData] = useState(null);
  const location = useLocation();
  useEffect(() => {
    UseAxios.get(
      `/communities/stars/${location.state.starId}/boards/${location.state.boardId}`
    ).then((res) => {
      setData(res.data);
    });
  }, []);
  return data ? (
    <div className='wrapper'>
      <Header title={data.communityDTO.user.nickname}></Header>
      <CommunityWriter data={data.communityDTO} styles={styles}></CommunityWriter>
      <CommunityContent data={data.communityDTO} styles={styles}></CommunityContent>
      <CommunityFooter data={data} styles={styles}></CommunityFooter>
    </div>
  ) : (
    '로딩로딩'
  );
}

export default CommunityPage;
