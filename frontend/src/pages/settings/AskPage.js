import React from 'react';
import Header from '../../components/common/Header';

function AskPage() {
  return (
    <div className='wrapper'>
      <Header title={'문의하기'}></Header>
      <div style={{ textAlign: 'center' }}>급한 용무는 개인적으로 연락 부탁드립니다.</div>
    </div>
  );
}

export default AskPage;
