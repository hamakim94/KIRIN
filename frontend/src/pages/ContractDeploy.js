import React, { useEffect, useState } from 'react';
// const fs = require("fs");

function ContractDeploy() {
  const [tokenABI, setTokenABI] = useState('');
  const [tokenCA, setTokenCa] = useState('');
  const [abi, setAbi] = useState('');
  const [bytecode, setByteCode] = useState('');
  const [web3, setWeb3] = useState('');
  const [money, setMoney] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participatedNum, setParticipatedNum] = useState('');
  const [targetNum, setTargetNum] = useState('');

  useEffect(() => {
    const Web3 = require('web3');
    var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
    // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_TESTURL));
    setWeb3(web3);
    setAbi(require('../FundRaisingABI.json'));
    setTokenCa(require('../TokenCA.json'));
    setByteCode(require('../FundRaisingByteCode.json'));
    setTokenABI(require('../TokenABI.json'));
  }, []);

  /**
   * Fundraising ABI, Fundraising Bytecode를 통해, 모금 스마트 계약 배포하는 함수
   * 준비물 : 스타 Address(로그인?), 스타 priavte key 생성자(argument) : 시간(초), 수혜자 계정, 배포된 ERC-20 토큰 주소
   * output : 트랜잭션 정보, 배포된 계약 주소(Contract Address)
   */
  const deploy = () => {
    const now = new Date();
    const date = Math.floor(now.getTime() / 1000);
    const contract = new web3.eth.Contract(abi);
    const mainAccount = process.env.REACT_APP_USERID; // 스타 주소
    web3.eth.defaultAccount = mainAccount;
    const myContract = contract.deploy({
      data: bytecode, // compile된 fundraising bytecode
      arguments: [date, date + 500, 3, process.env.REACT_APP_BENIFITID, tokenCA], // 600초, 목표 3명,  수혜자계정, 토큰주소
    });

    var tx = {
      from: mainAccount,
      gas: 9000000,
      data: myContract.encodeABI(),
    };
    // 여기서 유저 privateKey가 들어가고
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_USERKEY, (err, done) => {
      if (err) {
        // console.log(err);
      } else {
        web3.eth.sendSignedTransaction(done.rawTransaction).then((receipt) => {
          const CA = JSON.stringify(receipt.contractAddress);
          // console.log(receipt);
          // console.log(CA); // 이거 가지고 놀자
        });
      }
    });
  };

  /**
   * token을 송금하기 위해, ERC-20의 method인 increaseAllowance 함수를 사용하기 위함
   * 일반 참여자가, 모금 금고 지갑에게 돈을 줄 권리를 부여한다는 기능
   * 해당 함수를 실행해야, 일반인 토큰을 모금 금고로 옮길 수 있다.
   * 준비물 : 로그인된 사용자(address, privateKey), tokenABI, tokenCA, 모금CA, 송금할 금액
   */
  const increaseAllowance = async () => {
    var tokenContract = await new web3.eth.Contract(tokenABI, tokenCA);
    var increaseAllowance = await tokenContract.methods
      .increaseAllowance('0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50', 500)
      .encodeABI();
    var tx = {
      data: increaseAllowance,
      from: process.env.REACT_APP_USERID, //임의의 계정으로
      to: tokenContract.options.address,
      value: 0,
      gas: 2000000,
      chainId: 97889218,
    };
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_USERKEY, (err, done) => {
      if (err) {
        // console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(done.rawTransaction, (err, transactionHash) => {
            if (!err) {
              // console.log(transactionHash + ' success');
            } else {
              // console.log(err);
            }
          })
          .then(() => {
            alert('allowance 증가 완료');
          });
      }
    });
  };
  /**
   * 허락을 받았으니, 모금 금고에 토큰을 보내는 함수
   * 준비물 : FundRaisingABI, FundRaising CA, 얼마보낼지(500)
   * 결과 : 모금 금고 잔액 증가(500), 나중에 수정 가능
   */
  const sendToken = async (event) => {
    event.preventDefault();
    // await increaseAllowance();
    var sendContract = await new web3.eth.Contract(
      abi,
      '0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50'
    );
    var test = sendContract.methods.fundToken(500).encodeABI();
    // 트랜잭션 객체 생성
    var tx = {
      data: test,
      from: process.env.REACT_APP_USERID, //임의의 계정으로
      to: sendContract.options.address, // 모금 금고(CA)로 보내겠다.
      value: 0,
      gas: 2000000,
      chainId: 97889218,
    };
    // 인증을 위해 signTransaction 사용
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_USERKEY, (err, b) => {
      if (err) {
        // console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              // console.log(transactionHash + ' success');
            } else {
              // console.log('에러' + err);
            }
          })
          .then(() => {
            alert('모금 잔액 다시 보기 클릭하세용');
          });
      }
    });
  };
  /**
   * 컨트랙트의 의 토큰 잔액 확인하는 함수.
   * 준비물 : FundraisingABI, FundRaisingCA
   */
  const currentCollection = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      '0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50'
    );

    fundRaisingContract.methods // ABI, CA를 이용해 함수 접근
      .currentCollection()
      .call()
      .then((balance) => {
        // console.log(balance);
        setMoney(balance);
      });
  };

  /**
   * 수혜자 계정이 모금 금고에서 돈 뽑아가기
   * 준비물 : 모금금고CA, 모금금고ABI, 수혜자계정, 수혜자비밀키
   *
   */
  const withDraw = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      '0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50'
    );

    var data = fundRaisingContract.methods // ABI, CA를 이용해 함수 접근
      .withdrawToken()
      .encodeABI();
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
        alert('아직 제한시간 안 끝남!');
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              // console.log(transactionHash + ' success');
            } else {
              // console.log('에러' + err);
            }
          })
          .then(() => {
            alert('인출 완료!!');
          });
      }
    });
  };

  // timestamp 포맷을 사람이 읽을 수 있는 형태로 변환한다.
  function timeSince(date) {
    var seconds = Math.floor((date * 1000 - new Date()) / 1000);
    if (seconds < 0) {
      return 'over';
    }
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' years left';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months left';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days left';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours left';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes left';
    }
    return Math.floor(seconds) + ' seconds left';
  }

  const whenEnds = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      '0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50'
    );
    var data = await fundRaisingContract.methods.fundRaisingCloses().call();
    // console.log(data);
    setEndTime(timeSince(data));
  };

  const participate = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      '0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50'
    );

    var data = await fundRaisingContract.methods.participate().encodeABI();
    var tx = {
      data: data,
      from: process.env.REACT_APP_OTHERUSERID, //임의의 계정으로
      to: fundRaisingContract.options.address, // CA로 보내겠다.
      value: 0,
      gas: 2000000,
      chainId: 97889218,
    };
    web3.eth.accounts.signTransaction(tx, process.env.REACT_APP_OTHERUSERKEY, (err, b) => {
      if (err) {
        // console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              // console.log(transactionHash + ' success');
            } else {
              // console.log('에러' + err);
            }
          })
          .then(() => {
            alert('참가 완료 완료!!');
          });
      }
    });
  };

  const participateNum = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      '0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50'
    );
    var data = await fundRaisingContract.methods.participatedNum().call();
    setParticipatedNum(data);
  };

  const targetedNum = async (event) => {
    event.preventDefault();
    var fundRaisingContract = await new web3.eth.Contract(
      abi,
      '0x8A1A6eB1f73aA04294bC5c7B87e6E713Fbf7DF50'
    );
    var data = await fundRaisingContract.methods.targetNum().call();
    setTargetNum(data);
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
      {money}
      <hr></hr>
      <button onClick={whenEnds}>언제 끝나?</button>
      {endTime}
      <hr></hr>
      <button onClick={participate}>참가하기</button>
      <hr></hr>
      <button onClick={participateNum}>참가인원</button>
      {participatedNum}
      <button onClick={targetedNum}>목표인원</button>
      {targetNum}
      <hr></hr>
      {/* 클릭하면 withdraw 하는 함수 */}
      <button onClick={withDraw}>수혜자 인출스</button>
    </div>
  );
}

export default ContractDeploy;
