import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import styles from './BlockchainPage.module.css';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const rowNumPerPage = 15;
  const height = window.innerHeight;
  const rowHeight = (height - 237) / rowNumPerPage;

  // 하나의 블록
  function Transaction({ tx }) {
    return (
      <tr style={{ height: `${rowHeight}px` }} className={styles.row}>
        <td className={styles.hash}>{tx.hash}</td>
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
          <div
            style={{ display: 'flex', margin: 5, justifyContent: 'center', alignItems: 'center' }}
          >
            <div
              style={{
                border: '2px solid #c9c9c9',
                borderRadius: 8,
                padding: 2,
                width: 30,
                color: '#c9c9c9',
              }}
            >
              from
            </div>
            <div style={{ marginLeft: 5 }} className={styles.hash}>
              {from}
            </div>
          </div>
          <div
            style={{ display: 'flex', margin: 5, justifyContent: 'center', alignItems: 'center' }}
          >
            <div
              style={{
                border: '2px solid #c9c9c9',
                borderRadius: 8,
                padding: 2,
                width: 30,
                color: '#c9c9c9',
              }}
            >
              to
            </div>
            <div style={{ marginLeft: 5 }} className={styles.hash}>
              {to}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', margin: 5, justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            border: '2px solid #c9c9c9',
            borderRadius: 8,
            padding: 2,
            width: 30,
            color: '#c9c9c9',
          }}
        >
          from
        </div>
        <div style={{ marginLeft: 5 }} className={styles.hash}>
          {from}
        </div>
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
        <div href='/mypage/setting'>
          <AiFillSetting className={styles.setting}></AiFillSetting>
        </div>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
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
