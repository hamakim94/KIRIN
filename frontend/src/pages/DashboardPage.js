import React, { useEffect, useState } from "react";
import Web3 from "web3";
import styles from "./DashboardPage.module.css";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [blockNum, setBlockNum] = useState(0);
  const [transactionNum, setTransactionNum] = useState([]);
  const [chainId, setChainId] = useState("");
  const [web3, setWeb3] = useState("");

  useEffect(() => {
    const asyncCall = async () => {
      var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
      // var web3 = new Web3(process.env.REACT_APP_TESTURL);
      setWeb3(web3);
      const chainId = await web3.eth.getChainId();
      setChainId(chainId);
      const blockNum = await web3.eth.getBlockNumber();
      setBlockNum(blockNum);
      // 전체 가져오기
      let block;
      let txTotal = 0;
      for (let i = 0; i < blockNum; i++) {
        block = await web3.eth.getBlock(blockNum - i);
        if (block) {
          block.transactions.forEach((tx) => {
            txTotal++;
          });
        }
      }
      setTransactionNum(txTotal); // 좀 많이 느림
    };
    asyncCall();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBox}>
        <div className={styles.pageTitle}>블록체인 정보</div>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.infoName}>기린 토큰</div>
        <div className={styles.infoName}>CHAINID : {chainId}</div>
      </div>
      <div className={styles.infoBox}>
        <button onClick={() => navigate(`/dashboard/blockchain`)} className={styles.myWallet}>
          LATEST BLOCK : {blockNum}
        </button>
      </div>
      <div className={styles.infoBox}>
        <button onClick={() => navigate(`/dashboard/transaction`)} className={styles.myWallet}>
          TOTAL TX : {transactionNum}
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
