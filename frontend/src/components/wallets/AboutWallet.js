import React, { useState, useEffect } from "react";

function AboutWallet() {
  const [web3, setWeb3] = useState(""); // web3 연결하는 부분, useEffect를 통해 초반에 생성된다.
  const [address, setAddress] = useState(""); // 내 주소를 저장하는 부분, 추후에 상태관리 해야할 부분
  const [privateKey, setprivateKey] = useState(""); // 내 비밀번호, 추후에 상태관리 해야할 부분 or db에 저장.
  const [balance, setBalance] = useState(""); // 잔액
  const [loading, setLoading] = useState(""); // 로딩창 관련

  // 페이지가 실행되면, web3 이용 네트워크 연결)
  useEffect(() => {
    var Web3 = require("web3");
    var web3 = new Web3(process.env.REACT_APP_BCURL);
    setWeb3(web3);
  }, []);

  // 계정 생성하기 클릭하면, account 만들어줌 => 나중에 api로 저장하던가, back에서 처리해야할 부분 생김
  const makeWallet = (event) => {
    event.preventDefault();
    var account = web3.eth.accounts.create();
    setAddress(account.address);
    setprivateKey(account.privateKey);
  };

  // 계정의 이더리움 잔액 확인하는 함수. eth는 wei단위기때문에 10^18로 나눠서 이더리움 단위로 환산
  const viewWalletBalance = (event) => {
    event.preventDefault();
    web3.eth.getBalance(address).then((e) => setBalance(e / Math.pow(10, 18)));
  };
  /** 특정 계정으로 이더리움을 보내는 트랜잭션을 만드는 함수,
   *  tx : 트랜잭션 객체를 먼저 만든다.
   *  privateKey로 해당 트랜잭션을 인증한다
   *  signedTransaction을 통해 트랜잭션 전송
   *  mining이 되면 loading 사라지고
   *  잔액을 다시 확인할 수 있다.
   * */
  const send = (event) => {
    setLoading("Loading");
    event.preventDefault();
    var tx = {
      from: address,
      to: "0x031afd400b47748d1554a89e617917fabb19a809",
      value: 100000000000000000, // 0.1 ether
      gas: 2000000,
      chainId: 97889218,
    };
    web3.eth.accounts.signTransaction(tx, privateKey, (a, b) => {
      if (a) {
        console.log(a);
      } else {
        web3.eth.sendSignedTransaction(b.rawTransaction).then(() => {
          setLoading("");
          alert("잔액 다시 보기 클릭하세용");
        });
      }
    });
  };

  /**
   * 임의로 설정한(이더리움 많은 계정, geth keystore에 파일이 있는 경우)
   * 비밀번호를 통해 계정을 unLock한다
   * 그다음 sendTransaction(계정을 unlock했기 때문에 sign이 필요 없다)을 통해,
   * 만든 계정에 1 이더리움을 보내는 함수
   */
  const chargeBalance = (event) => {
    setLoading("Loading");
    event.preventDefault();
    var tx = {
      from: process.env.REACT_APP_ADMINID,
      to: address,
      value: 100000000000000000, // 0.1 ether
      gas: 2000000,
      chainId: 97889218,
    };
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_ADMINKEY, (a, b) => {
      if (a) {
        console.log(a);
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

  // const chargeBalance = (event) => {
  //   event.preventDefault();
  //   web3.eth.personal
  //     .unlockAccount("0x031afd400b47748d1554a89e617917fabb19a809", "girin6")
  //     .then(() => {
  //       web3.eth.sendTransaction(
  //         {
  //           from: "0x031afd400b47748d1554a89e617917fabb19a809",
  //           to: address,
  //           value: web3.utils.toWei("1", "ether"),
  //         },
  // (err, transactionHash) => {
  //   if (!err) {
  //     console.log(transactionHash + " success");
  //   } else {
  //     console.log(err);
  //   }
  // }
  //       );
  //     });
  // };

  return (
    <div>
      <button onClick={makeWallet}>지갑 생성하기</button>
      <div>
        <div>주소 : {address}</div>
        <div>개인 키 : {privateKey}</div>
      </div>
      <hr></hr>
      <button onClick={viewWalletBalance}>잔액 보기</button>
      <div>잔액 : {balance}</div>
      <hr></hr>
      <form onSubmit={chargeBalance}>
        {/* address : <input type="text"></input> */}
        <button type="submit">1 이더 충전하기</button>
      </form>
      <button onClick={send}>0.1 이더 보내기!!</button>
      {loading}
    </div>
  );
}

export default AboutWallet;
