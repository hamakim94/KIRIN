import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Pagination } from '@mui/material';
import styles from './BlockchainPage.module.css';
import Header from '../components/common/Header';

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

function BlockchainPage() {
  const [blocks, setBlocks] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
  const rowNumPerPage = 15;
  const height = window.innerHeight;
  const rowHeight = (height - 237) / rowNumPerPage;
  // top 30+20+30 80 / th 40 / bottom 55 / pagination 20 10 32 62
  // 하나의 블록
  function Block({ block }) {
    return (
      <tr style={{ height: `${rowHeight}px` }} className={styles.row}>
        <td>{block.number}</td>
        <td>{block.timestamp}</td>
        <td className={styles.ellipsis}>{block.hash}</td>
        <td>{block.txCount}</td>
      </tr>
      // <div>
      //   <hr></hr>
      //   <div>
      //     {block.number} {block.timestamp} {block.hash.substr(0, 6) + '...'} {block.txCount}
      //   </div>
      // </div>
    );
  }

  useEffect(() => {
    var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
    // var web3 = new Web3(process.env.REACT_APP_TESTURL);
    // 1000 초만 실행
    const interval = setInterval(() => {
      const asyncCall = async () => {
        let block;
        let i;
        let blockArr = [];
        var temp;

        // table th 40 + pagination 86

        // 마지막 블록의 개수 가져오기
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
            temp = {
              number: block.number,
              hash: block.hash,
              timestamp: timeSince(block.timestamp),
              txCount: block.transactions.length,
            };
            blockArr.push(temp);
          }
        } else {
          for (
            i = rowNumPerPage * (page - 1);
            i < rowNumPerPage * (page - 1) + rowNumPerPage;
            i++
          ) {
            block = await web3.eth.getBlock(blockNum - i);
            temp = {
              number: block.number,
              hash: block.hash,
              timestamp: timeSince(block.timestamp),
              txCount: block.transactions.length,
            };
            blockArr.push(temp);
          }
        }
        setBlocks(blockArr);
      };
      asyncCall();
    }, 1000);
    return () => clearInterval(interval);
  }, [page]);

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

  return (
    <div className='wrapper'>
      <Header title={'블록 정보'}></Header>
      <table className={styles.table}>
        <colgroup>
          <col width='18%' />
          <col width='22%' />
          <col width='50%' />
          <col width='10%' />
        </colgroup>
        <thead>
          <tr>
            <th className={styles.table_header}>BLOCK HEIGHT</th>
            <th className={styles.table_header}>AGE</th>
            <th className={styles.table_header}>BLOCK HASH</th>
            <th className={styles.table_header}>TX</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block, index) => (
            <Block block={block} key={index}></Block>
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

export default BlockchainPage;
