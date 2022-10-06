import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Pagination } from '@mui/material';
import styles from './BlockchainPage.module.css';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
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

      let block;
      let i;
      let txArr = [];
      var temp;

      const blockNum = await web3.eth.getBlockNumber();
      const LAST_PAGE =
        blockNum % rowNumPerPage === 0
          ? parseInt(blockNum / rowNumPerPage)
          : parseInt(blockNum / rowNumPerPage) + 1; // 마지막 페이지
      setLastPage(LAST_PAGE);

      if (page === LAST_PAGE) {
        // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
        for (i = rowNumPerPage * (page - 1); i < blockNum; i++) {
          block = await web3.eth.getBlock(blockNum - i);
          block.transactions.forEach((tx) => {
            temp = {
              hash: tx,
              from: null,
              to: null,
              timeSince: timeSince(block.timestamp),
              timeStamp: block.timestamp,
            };
            txArr.push(temp);
            web3.eth
              .getTransaction(tx)
              .then((txDetail) => {
                temp.from = txDetail.from;
                temp.to = txDetail.to;
              })
              .catch(console.error);
          });
        }
      } else {
        for (i = rowNumPerPage * (page - 1); i < rowNumPerPage * (page - 1) + rowNumPerPage; i++) {
          block = await web3.eth.getBlock(blockNum - i);
          block.transactions.forEach((tx) => {
            temp = {
              hash: tx,
              from: null,
              to: null,
              timeSince: timeSince(block.timestamp),
              timeStamp: block.timestamp,
            };
            txArr.push(temp);
            web3.eth
              .getTransaction(tx)
              .then((txDetail) => {
                temp.from = txDetail.from;
                temp.to = txDetail.to;
              })
              .catch(console.error);
          });
        }
      }
      setTransactions(txArr);
    };
    asyncCall();
  }, [page]);

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

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Pagination
          count={lastPage}
          defaultPage={1}
          boundaryCount={2}
          onChange={(e) => handlePage(e)}
          hideNextButton={true}
          hidePrevButton={true}
        />
      </div>
    </div>
  );
}

export default TransactionPage;
