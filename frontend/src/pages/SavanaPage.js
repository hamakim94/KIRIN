import React from 'react';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';

function SavanaPage() {
  return (
    <div>
      <ChallengeList styles={styles}></ChallengeList>
    </div>
  );
}

export default SavanaPage;
