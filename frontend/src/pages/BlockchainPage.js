import React, { useEffect, useState } from "react";
import Web3 from "web3";

function BlockchainPage() {
  const [block, setBlock] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [web3, setWeb3] = useState("");

  // 하나의 블록
  function Block({ block }) {
    return (
      <div>
        <hr></hr>
        <div>
          <b>블록 숫자 : </b> <span>{block.number}</span>
        </div>
        <div>
          <b>{block.timestamp}</b>
        </div>
        <div>
          <b>트랜잭션 수 : </b> <span>({block.txCount})</span>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const asyncCall = async () => {
      var web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_BCURL));
      setWeb3(web3);
      const blockNum = await web3.eth.getBlockNumber();

      // 상위 20개만 가져오기
      let block;
      let i;
      let blockArr = [];
      for (i = 0; i < 20; i++) {
        block = await web3.eth.getBlock(blockNum - i);
        var temp = {
          number: block.number,
          timestamp: timeSince(block.timestamp),
          txCount: block.transactions.length,
        };
        // if (temp.txCount > 0) {
        //   blockArr.push(temp);
        // }
        blockArr.push(temp);
      }
      setBlocks(blockArr);
      console.log(blockArr);
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
        {blocks.map((block, index) => (
          <Block block={block} key={index}></Block>
        ))}
        <button>더 보기</button>
      </div>
      <hr></hr>
    </div>
  );
}

export default BlockchainPage;
