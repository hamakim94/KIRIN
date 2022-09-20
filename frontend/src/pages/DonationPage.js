import React, { useEffect, useState } from 'react';
import DonationList from '../components/donation/DonationList';
import DontaionTop from '../components/donation/DonationTop';
import styles from './DonationPage.module.css';

function DonationPage() {
  return (
    <div>
      <DontaionTop styles={styles}></DontaionTop>
      <DonationList styles={styles}></DonationList>
    </div>
  );
}

export default DonationPage;
