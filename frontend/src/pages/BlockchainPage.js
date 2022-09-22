import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Pagination } from "@mui/material";

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

function BlockchainPage() {
  const [blocks, setBlocks] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.

  // 하나의 블록
  function Block({ block }) {
    return (
      <div>
        <hr></hr>
        <div>
          {block.number} {block.timestamp} {block.hash.substr(0, 6) + "..."} {block.txCount}
        </div>
      </div>
    );
  }

  useEffect(() => {
    var web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_BCURL));
    // 1000 초만 실행
    const interval = setInterval(() => {
      const asyncCall = async () => {
        // 마지막 블록의 개수 가져오기
        const blockNum = await web3.eth.getBlockNumber();
        const LAST_PAGE =
          blockNum % 10 === 0 ? parseInt(blockNum / 10) : parseInt(blockNum / 10) + 1; // 마지막 페이지
        setLastPage(LAST_PAGE);

        let block;
        let i;
        let blockArr = [];
        var temp;
        if (page === LAST_PAGE) {
          // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
          for (i = 10 * (page - 1); i < blockNum; i++) {
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
          for (i = 10 * (page - 1); i < 10 * (page - 1) + 10; i++) {
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
    <div>
      <div>블록에 대한 정보</div>
      <div>BLOCK-HEIGHT BLOCK-AGE BLOCK-HASH TX</div>
      <div>
        {blocks.map((block, index) => (
          <Block block={block} key={index}></Block>
        ))}
      </div>
      <hr></hr>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={lastPage}
          defaultPage={1}
          boundaryCount={2}
          size="medium"
          sx={{ mt: 3, mb: 3 }}
          onChange={(e) => handlePage(e)}
          hideNextButton={true}
          hidePrevButton={true}
        />
      </div>
    </div>
  );
}

export default BlockchainPage;
