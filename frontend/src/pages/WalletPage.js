import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Backdrop,
  CircularProgress,
} from "@mui/material/";
import styles from "./WalletPage.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ABI from "../TokenABI.json";
import CA from "../TokenCA.json";
import { BiArrowBack } from "react-icons/bi";

// 숫자만 입력해
const isLetters = (str) => /^[0-9]*$/.test(str);

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC947",
    },
    secondary: {
      main: "#11cb5f",
    },
  },
});

function WalletPage() {
  const [web3, setWeb3] = useState(""); // web3 연결하는 부분, useEffect를 통해 초반에 생성된다.
  const [address] = useState(process.env.REACT_APP_USERID); // 내 주소를 저장하는 부분, 추후에 상태관리 해야할 부분
  // const [privateKey, setprivateKey] = useState(process.env.REACT_APP_USERKEY); // 내 비밀번호, 추후에 상태관리 해야할 부분 or db
  const [tokenBalance, setTokenBalance] = useState(""); // 토큰 잔액
  const [tokenContract, setTokenContract] = useState("");
  const [tokens, setTokens] = useState("");
  const [balance, setBalance] = useState(""); // 잔액
  const [open, setOpen] = React.useState(false);

  // 페이지가 실행되면, web3 이용 네트워크 연결)
  useEffect(() => {
    var Web3 = require("web3");
    var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
    // var web3 = new Web3(process.env.REACT_APP_TESTURL);
    var contract = new web3.eth.Contract(ABI, CA); // ABI, CA를 통해 contract 객체를 만들어서 보관한다. 나중에 활용함
    setWeb3(web3);
    setTokenContract(contract);
    web3.eth
      .getBalance(address)
      .then((e) => setBalance(Math.round((e / Math.pow(10, 18)) * 10000) / 10000));
    contract.methods // ABI, CA를 이용해 함수 접근
      .balanceOf(address)
      .call()
      .then((balance) => {
        setTokenBalance(balance);
      });
  }, [address]);
  // 로딩 관련
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  // 폼에 숫자만 입력해요
  const onChangeTokens = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setTokens(value);
    }
  };

  /**
   * 계정의 토큰 잔액 확인하는 함수.
   * eth는 wei단위기때문에 10^18로 나눠서 이더리움 단위로 환산
   * 준비물 : 조회하려는 계정 주소
   */
  const ethBalance = () => {
    handleToggle();
    web3.eth
      .getBalance(address)
      .then((e) => setBalance(e / Math.pow(10, 18)))
      .then(() => handleClose());
  };

  const chargeEthBalance = (event) => {
    handleToggle();
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
            alert("충전 완료");
            ethBalance();
            handleClose();
          });
      }
    });
  };

  /**
   * 계정의 토큰 잔액 확인하는 함수.
   * tokenCA, tokenABI 필요하다(해당 함수는, 이미 데이터를 가지고있음)
   */
  const viewTokenBalance = () => {
    tokenContract.methods // ABI, CA를 이용해 함수 접근
      .balanceOf(address)
      .call()
      .then((balance) => {
        setTokenBalance(balance);
      });
  };
  /**
   * contract를 배포한 admin 계정으로부터 1000 토큰을 받아오는 함수
   * 1000을 나중에 폼으로 수정해, 얼마 충전할지 정할 수 있음
   * encodeIBI를 통해, ABI,CA를 활용한 Contract 자체를 transaction의 data에 넣어서 실행이 가능
   * 준비물 : AdminAddress, Admin AdminPrivateKey, tokenContractCA
   */
  const getToken = async () => {
    handleToggle();
    var test = tokenContract.methods
      .transferFrom(process.env.REACT_APP_ADMINID, address, Number(tokens)) // num개 충전
      .encodeABI(); // Contract Method를 ABI로 만들기
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
            setTokens("");
            viewTokenBalance();
            alert("충전 완료!");
            handleClose();
          });
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <div className={styles.topBox}>
        <a href="/mypage">
          <BiArrowBack className={styles.back}></BiArrowBack>
        </a>
        <div className={styles.pageTitle}>내 지갑!</div>
        {"\u00A0"}
      </div>
      <div>
        <Container component="main" maxWidth="lg" m={2} disableGutters={true}>
          <Grid container alignItems="center" justify="center" spacing={2} p={2}>
            <Grid item xs={6}>
              <Typography sx={{ ml: 0.5, mb: 0.5 }}>지갑 주소</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ ml: 0.5, mb: 0.5 }}>{address.substr(0, 15) + "..."}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ ml: 0.5, mb: 0.5 }}>이더리움 잔고</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ ml: 0.5, mb: 0.5 }}>
                {balance ? balance + " ETH" : "0 ETH"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={chargeEthBalance}
                size="medium"
              >
                충전
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ ml: 0.5, mt: 1, mb: 0.5 }}>KIRIN 토큰양</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ ml: 0.5, mb: 0.5 }}>
                {tokenBalance ? tokenBalance + " KRT" : "0 KRT"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ ml: 0.5, mt: 1 }}>KIRIN 토큰 충전하기*</Typography>
            </Grid>
            <Grid item xs={9} sm={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tokens"
                onChange={onChangeTokens}
                value={tokens}
                label="숫자만 입력 가능합니다"
                size="small"
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={getToken}
                disabled={!tokens}
                size="medium"
              >
                충전
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default WalletPage;
