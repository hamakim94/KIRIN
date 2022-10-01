import React, { useEffect, useState } from 'react';
import styles from './TransactionPage.module.css';
import UseAxios from '../utils/UseAxios';
import Header from '../components/common/Header';

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  // const rowNumPerPage = 15;
  // const height = window.innerHeight;
  // const rowHeight = (height - 237) / rowNumPerPage;

  // 하나의 블록
  function Transaction({ tx }) {
    return (
      // <tr style={{ height: `${rowHeight}px` }} className={styles.row}>
      <tr style={{ height: `60px` }} className={styles.row}>
        <td className={styles.ellipsis}>{tx.hash}</td>
        <td>{tx.reg}</td>
        <td>
          <FromTo from={tx.fromHash} to={tx.toHash} />
        </td>
      </tr>
    );
  }

  function FromTo({ from, to }) {
    if (to) {
      return (
        <div>
          <div className={styles.fromtoBox}>
            <div className={styles.fromto}>from</div>
            <div className={`${styles.ellipsis} ${styles.fromtoContent}`}>{from}</div>
          </div>
          <div className={styles.fromtoBox}>
            <div className={styles.fromto}>to</div>
            <div className={`${styles.ellipsis} ${styles.fromtoContent}`}>{to}</div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.fromtoBox}>
        <div className={styles.fromto}>from</div>
        <div className={`${styles.ellipsis} ${styles.fromtoContent}`}>{from}</div>
      </div>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const asyncCall = async () => {
        const res = await UseAxios.get(`/blockchain/transactions`);
        const txArr = res.data;
        txArr.forEach((tx) => {
          tx.reg = timeSince(new Date(tx.reg));
        });
        txArr.reverse();
        setTransactions(txArr);
      };
      asyncCall();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // timestamp 포맷을 사람이 읽을 수 있는 형태로 변환한다.
  function timeSince(date) {
    var seconds = Math.floor(new Date() - date);
    seconds /= 1000;
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + '년 전';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + '개월 전';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + '일 전';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + '시간 전';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + '분 전';
    }
    return Math.floor(seconds) + '초 전';
  }

  return (
    <div className='wrapper'>
      <Header title={'트랜잭션 정보'}></Header>
      <table className={styles.table}>
        <colgroup>
          <col width='30%' />
          <col width='20%' />
          <col width='50%' />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.table_header}>HASH</th>
            <th className={styles.table_header}>AGE</th>
            <th className={styles.table_header}>FROM -&gt; TO</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <Transaction tx={tx} key={index}></Transaction>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionPage;
