import React, { useState, useEffect } from "react";

import ABI from "../TokenABI.json";
import CA from "../TokenCA.json";

function WalletPage() {
  const [web3, setWeb3] = useState(""); // web3 연결하는 부분, useEffect를 통해 초반에 생성된다.
  const [address, setAddress] = useState(process.env.REACT_APP_USERID); // 내 주소를 저장하는 부분, 추후에 상태관리 해야할 부분
  const [privateKey, setprivateKey] = useState(process.env.REACT_APP_USERKEY); // 내 비밀번호, 추후에 상태관리 해야할 부분 or db
  const [balance, setBalance] = useState(""); // 잔액
  const [tokenBalance, setTokenBalance] = useState(""); // 토큰 잔액
  const [loading, setLoading] = useState(""); // 로딩창 관련
  const [tokenContract, setTokenContract] = useState("");
  // 페이지가 실행되면, web3 이용 네트워크 연결)
  useEffect(() => {
    var Web3 = require("web3");
    var web3 = new Web3(process.env.REACT_APP_BCURL);
    var contract = new web3.eth.Contract(ABI, CA); // ABI, CA를 통해 contract 객체를 만들어서 보관한다. 나중에 활용함
    setWeb3(web3);
    setTokenContract(contract);
    console.log(contract);
  }, []);

  // 계정 생성하기 클릭하면, account 만들어줌 => 나중에 api로 저장하던가, back에서 처리해야할 부분 생김
  const makeWallet = (event) => {
    event.preventDefault();
    var account = web3.eth.accounts.create();
    setAddress(account.address);
    setprivateKey(account.privateKey);
  };

  // 계정의 토큰 잔액 확인하는 함수. eth는 wei단위기때문에 10^18로 나눠서 이더리움 단위로 환산
  const ethBalance = (event) => {
    event.preventDefault();
    setLoading(true);
    web3.eth
      .getBalance(address)
      .then((e) => setBalance(e / Math.pow(10, 18)))
      .then(setLoading(false));
  };

  /**
   * 임의로 설정한(이더리움 많은 계정, geth keystore에 파일이 있는 경우)
   * 비밀번호를 통해 계정을 unLock한다
   * 그다음 sendTransaction(계정을 unlock했기 때문에 sign이 필요 없다)을 통해,
   * 만든 계정에 1 이더리움을 보내는 함수
   */
  const chargeEthBalance = (event) => {
    setLoading("Loading");
    event.preventDefault();
    var tx = {
      from: process.env.REACT_APP_ADMINID,
      to: address,
      value: 10000000000000000000, // 10 ether
      gas: 2000000,
      chainId: 97889218,
    };
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_ADMINKEY, (err, b) => {
      if (err) {
        console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              console.log(transactionHash + " success");
            } else {
              console.log(err);
            }
          })
          .then(() => {
            setLoading("");
            alert("잔액 다시 보기 클릭하세용");
          });
      }
    });
  };

  // 계정의 토큰 잔액 확인하는 함수.
  const viewTokenBalance = (event) => {
    event.preventDefault();
    setLoading(true);

    tokenContract.methods // ABI, CA를 이용해 함수 접근
      .balanceOf(address)
      .call()
      .then((balance) => {
        setTokenBalance(balance);
        setLoading(false);
      });
    // web3.eth.getBalance(address).then((e) => setBalance(e / Math.pow(10, 18)));
  };

  // 1000 토큰 충전하는 함수, 추후에 form으로 받아서 얼마 충전할지 나타내야함
  // encodeIBI를 통해, ABI,CA를 활용한 Contract 자체를 transaction의 data에 넣어서 실행이 가능
  const getToken = async (event) => {
    event.preventDefault();
    setLoading("기다리세요");
    // Contract Method를 ABI로 만들기
    var test = tokenContract.methods
      .transferFrom(process.env.REACT_APP_ADMINID, process.env.REACT_APP_USERID, 1000) // 1000개 충전
      .encodeABI();
    // 트랜잭션 객체 생성
    var tx = {
      data: test,
      from: process.env.REACT_APP_ADMINID, // 관리자 계정에서
      to: tokenContract.options.address, // CA로 보내겠다.
      value: 0,
      gas: 2000000,
      chainId: 97889218,
    };
    // 인증을 위해 signTransaction 사용
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_ADMINKEY, (err, b) => {
      if (err) {
        console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              console.log(transactionHash + " success");
            } else {
              console.log(err);
            }
          })
          .then(() => {
            setLoading("");
            alert("잔액 다시 보기 클릭하세용");
          });
      }
    });
  };

  return (
    <div>
      <button onClick={makeWallet}>지갑 생성하기</button>
      <div>
        <div>주소 : {address}</div>
        <div>개인 키 : {privateKey}</div>
      </div>
      <hr></hr>
      <button onClick={ethBalance}>이더리움 잔액 보기</button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>잔액 : {balance}</div>
        <form onSubmit={chargeEthBalance}>
          {/* address : <input type="text"></input> */}
          <button type="submit">10 이더 충전하기</button>
        </form>
      </div>
      <hr></hr>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={viewTokenBalance}>토큰잔액 보기</button>
        <button onClick={getToken}>1000 토큰 받기</button>
      </div>

      <div>잔액 : {tokenBalance}</div>
      <hr></hr>
      {loading}
    </div>
  );
}

export default WalletPage;
