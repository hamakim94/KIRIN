import React, { useEffect, useState } from "react";
import Web3 from "web3";

function TransactionPage() {
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [block, setBlock] = useState(0);
  const [blockHeight, setBlockHeight] = useState(null);
  const [web3, setWeb3] = useState("");

  // 하나의 블록
  function Transaction({ tx }) {
    return (
      <div>
        <hr></hr>
        <div>
          <b>트랜잭션 해시: </b> <span>{tx.hash}</span>
        </div>
        <div>
          <b>{tx.timeSince}</b>
        </div>
        <div>
          <b>From : </b> <span>{tx.from}</span>
        </div>
        <div>
          <b>To : </b> <span>{tx.to}</span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const asyncCall = async () => {
      var web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_BCURL));
      setWeb3(web3);
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
      console.log(txArr);
    };
    asyncCall();
  }, []);

  // timestamp 포맷을 사람이 읽을 수 있는 형태로 변환한다.
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date * 1000) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }
  return (
    <div>
      <div>
        {transactions.map((tx, index) => (
          <Transaction tx={tx} key={index}></Transaction>
        ))}
        <button>더 보기</button>
      </div>
      <hr></hr>
    </div>
  );
}

export default TransactionPage;
