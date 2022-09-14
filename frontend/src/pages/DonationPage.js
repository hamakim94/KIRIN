import React, { useEffect, useState } from 'react';
import DonationList from '../components/donation/DonationList';
import styles from './DonationPage.module.css';

function DonationPage() {
  return (
    <div>
      <div className={styles.pageTitle}>나의 기부</div>
      <DonationList styles={styles}></DonationList>
      <hr></hr>
    </div>
  );
}

export default DonationPage;
