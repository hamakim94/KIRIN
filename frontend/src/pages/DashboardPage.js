import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import styles from './DashboardPage.module.css';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../utils/UseAxios';
import Header from '../components/common/Header';

function DashboardPage() {
  const navigate = useNavigate();
  const [blockNum, setBlockNum] = useState(0);
  const [transactionNum, setTransactionNum] = useState([]);
  const [chainId, setChainId] = useState('');
  const [web3, setWeb3] = useState('');
  useEffect(() => {
    UseAxios.get(`/blockchain/transactions`).then((res) => {
      setTransactionNum(res.data.length); // 좀 많이 느림
    });
    const asyncCall = async () => {
      var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
      // var web3 = new Web3(process.env.REACT_APP_TESTURL);
      setWeb3(web3);
      const chainId = await web3.eth.getChainId();
      setChainId(chainId);
      const blockNum = await web3.eth.getBlockNumber();
      setBlockNum(blockNum);
      // 전체 가져오기
    };
    asyncCall();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header title={'블록체인 정보'}></Header>
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
