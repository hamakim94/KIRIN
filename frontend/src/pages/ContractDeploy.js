import React, { useEffect, useState } from "react";
// const fs = require("fs");

function ContractDeploy() {
  const [tokenABI, setTokenABI] = useState("");
  const [tokenCA, setTokenCa] = useState("");
  const [abi, setAbi] = useState("");
  const [bytecode, setByteCode] = useState("");
  const [web3, setWeb3] = useState("");

  useEffect(() => {
    const Web3 = require("web3");
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_BCURL));
    setWeb3(web3);
    setAbi(require("../FundRaisingABI.json"));
    setTokenCa(require("../TokenCA.json"));
    setByteCode(require("../FundRaisingByteCode.json"));
    setTokenABI(require("../TokenABI.json"));
  }, []);

  const deploy = () => {
    const contract = new web3.eth.Contract(abi);
    console.log(contract);
    //현재는 유저가 계약을 배포하는 걸로 해보자. address that will deploy smart contract
    const mainAccount = process.env.REACT_APP_USERID;
    web3.eth.defaultAccount = mainAccount;
    const myContract = contract.deploy({
      data: bytecode,
      arguments: [600, process.env.REACT_APP_BENIFITID, tokenCA], // 600초, 수혜자계정, 토큰주소
    });

    var tx = {
      from: mainAccount,
      gas: 9000000,
      data: myContract.encodeABI(),
    };
    // const CA = "";
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_USERKEY, (err, done) => {
      if (err) {
        console.log(err);
      } else {
        web3.eth.sendSignedTransaction(done.rawTransaction).then((receipt) => {
          const CA = JSON.stringify(receipt.contractAddress);
          console.log(receipt);
          console.log(CA); // 이거 가지고 놀자
        });
      }
    });
  };
  // 다른 유저가 해당 컨트랙트에 송금하는거 만들어~

  // USER : 0x4B9eff9618d268Ddd462e5765812B2F3eF0cac02 가 스마트컨트랙트 배포함
  const increaseAllowance = async () => {
    var tokenContract = await new web3.eth.Contract(tokenABI, tokenCA);
    var increaseAllowance = await tokenContract.methods
      .increaseAllowance("0x3c8eaB03c5d7272E1018f121b454aa36276F82e6", 500) // 여기에 스마트컨트랙트주소 들어가야하나
      .encodeABI();
    var tx = {
      data: increaseAllowance,
      from: process.env.REACT_APP_OTHERUSERID, //임의의 계정으로
      to: tokenContract.options.address,
      value: 0,
      gas: 2000000,
      chainId: 97889218,
    };
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_OTHERUSERKEY, (err, done) => {
      if (err) {
        console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(done.rawTransaction, (err, transactionHash) => {
            if (!err) {
              console.log(transactionHash + " success");
            } else {
              console.log(err);
            }
          })
          .then(() => {
            alert("allowance 증가 완료");
          });
      }
    });
  };
  const sendToken = async (event) => {
    event.preventDefault();
    // await increaseAllowance();
    var sendContract = await new web3.eth.Contract(
      abi,
      "0x3c8eaB03c5d7272E1018f121b454aa36276F82e6"
    );
    var test = sendContract.methods.fundToken(500).encodeABI();
    console.log(test);
    // 트랜잭션 객체 생성
    var tx = {
      data: test,
      from: process.env.REACT_APP_OTHERUSERID, //임의의 계정으로
      to: sendContract.options.address, // CA로 보내겠다.
      value: 0,
      gas: 2000000,
      chainId: 97889218,
    };
    // 인증을 위해 signTransaction 사용
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_OTHERUSERKEY, (err, b) => {
      if (err) {
        console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              console.log(transactionHash + " success");
            } else {
              console.log("에러" + err);
            }
          })
          .then(() => {
            alert("잔액 다시 보기 클릭하세용");
          });
      }
    });
  };
  // 컨트랙트의 의 토큰 잔액 확인하는 함수.
  const currentCollection = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      "0x3c8eaB03c5d7272E1018f121b454aa36276F82e6"
    );

    fundRaisingContract.methods // ABI, CA를 이용해 함수 접근
      .currentCollection()
      .call()
      .then((balance) => {
        console.log(balance);
      });
    // web3.eth.getBalance(address).then((e) => setBalance(e / Math.pow(10, 18)));
  };

  // 1. payable이 있네.. 안 보내보기
  // 2. 0 보내보기
  // 3.
  const withDraw = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      "0x3c8eaB03c5d7272E1018f121b454aa36276F82e6"
    );

    var data = fundRaisingContract.methods // ABI, CA를 이용해 함수 접근
      .withdrawToken()
      .encodeABI();
    // web3.eth.getBalance(address).then((e) => setBalance(e / Math.pow(10, 18)));
    var tx = {
      data: data,
      from: process.env.REACT_APP_BENIFITID, //임의의 계정으로
      to: fundRaisingContract.options.address, // CA로 보내겠다.
      value: 0,
      gas: 2000000,
      chainId: 97889218,
    };
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_BENEFITKEY, (err, b) => {
      if (err) {
        console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              console.log(transactionHash + " success");
            } else {
              console.log("에러" + err);
            }
          })
          .then(() => {
            alert("인출 완료!!");
          });
      }
    });
  };

  return (
    <div>
      <button onClick={deploy}>스타가 컨트랙트를 배포한다.</button>
      <hr></hr>
      <button onClick={sendToken}>임의의 유저가 500토큰을 보낸다</button>
      <hr></hr>
      <button onClick={increaseAllowance}>임의의 유저 500allowance 증가</button>
      allowance :<hr></hr>
      <button onClick={currentCollection}>현재 가지고 있는 토큰 양</button>
      <hr></hr>
      {/* 클릭하면 withdraw 하는 함수 */}
      <button onClick={withDraw}>수혜자 인출스</button>
    </div>
  );
}

export default ContractDeploy;
