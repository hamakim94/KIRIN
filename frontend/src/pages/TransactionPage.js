import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import styles from './TransactionPage.module.css';
import { BiArrowBack } from 'react-icons/bi';

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
        <td>{tx.timeSince}</td>
        <td>
          <FromTo from={tx.from} to={tx.to} />
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
    const asyncCall = async () => {
      var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
      // var web3 = new Web3(process.env.REACT_APP_TESTURL);
      const blockNum = await web3.eth.getBlockNumber();

      // 전체 가져오기
      let block;
      let i;
      let txArr = [];
      for (i = 0; i < blockNum; i++) {
        block = await web3.eth.getBlock(blockNum - i);
        block.transactions.forEach((tx) => {
          var txInfo = {
            hash: tx,
            from: null,
            to: null,
            timeSince: timeSince(block.timestamp),
            timeStamp: block.timestamp,
          };
          txArr.push(txInfo);
          web3.eth
            .getTransaction(tx)
            .then((txDetail) => {
              txInfo.from = txDetail.from;
              txInfo.to = txDetail.to;
            })
            .catch(console.error);
        });
      }
      setTransactions(txArr);
      // console.log(txArr);
    };
    asyncCall();
  }, []);

  // timestamp 포맷을 사람이 읽을 수 있는 형태로 변환한다.
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date * 1000) / 1000);
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
    <div style={{ paddingBottom: 55 }}>
      <div className={styles.topBox}>
        <a>
          <BiArrowBack className={styles.back}></BiArrowBack>
        </a>
        <div className={styles.pageTitle}>트랜잭션 정보</div>
        <div style={{ width: 25 }}></div>
      </div>
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
