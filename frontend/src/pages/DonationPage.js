import React, { useEffect, useState } from 'react';
import DonationList from '../components/donation/DonationList';
import DontaionTop from '../components/donation/DonationTop';
import styles from './DonationPage.module.css';
import UseAxios from '../utils/UseAxios';

function DonationPage() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    UseAxios.get('/challenges', {}).then((res) => {
      setDonations(res.data);
    });
  }, []);

  return (
    <div>
      <DontaionTop styles={styles} donations={donations}></DontaionTop>
      <DonationList styles={styles}></DonationList>
    </div>
  );
}

export default DonationPage;
