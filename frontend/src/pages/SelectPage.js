import React from 'react';
import SelectList from '../components/challenge/select/SelectList';
import styles from './SelectPage.module.css';
import Header from '../components/common/Header';
function SelectPage() {
  return (
    <div className='wrapper' style={{ height: window.innerHeight - 70, paddingTop: 15 }}>
      <div id={styles.coverWrapper}>
        <Header title={'챌린지 선택'}></Header>
        <div>인기 챌린지</div>
        <SelectList styles={styles}></SelectList>
      </div>
    </div>
  );
}

export default SelectPage;
