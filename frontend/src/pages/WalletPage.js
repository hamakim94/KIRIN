import React, { useState, useEffect } from 'react';
import styles from './WalletPage.module.css';
import { BiArrowBack } from 'react-icons/bi';
import { Button, TextField } from '@mui/material/';
import { AiOutlineCopy } from 'react-icons/ai';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ABI from '../TokenABI.json';
import CA from '../TokenCA.json';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d2d2d2',
    },
  },
});

// 숫자만 입력해
const isLetters = (str) => /^[0-9]*$/.test(str);

function WalletPage() {
  const [web3, setWeb3] = useState(''); // web3 연결하는 부분, useEffect를 통해 초반에 생성된다.
  const [address] = useState(process.env.REACT_APP_USERID); // 내 주소를 저장하는 부분, 추후에 상태관리 해야할 부분
  // const [privateKey, setprivateKey] = useState(process.env.REACT_APP_USERKEY); // 내 비밀번호, 추후에 상태관리 해야할 부분 or db
  const [tokenBalance, setTokenBalance] = useState(''); // 토큰 잔액
  const [tokenContract, setTokenContract] = useState('');
  const [tokens, setTokens] = useState('');
  const [balance, setBalance] = useState(''); // 잔액
  const [open, setOpen] = React.useState(false);

  // 페이지가 실행되면, web3 이용 네트워크 연결)
  useEffect(() => {
    var Web3 = require('web3');
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
        // console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              // console.log(transactionHash + ' success');
            } else {
              // console.log(err);
            }
          })
          .then(() => {
            alert('충전 완료');
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
        // console.log(err);
      } else {
        web3.eth
          .sendSignedTransaction(b.rawTransaction, (err, transactionHash) => {
            if (!err) {
              // console.log(transactionHash + ' success');
            } else {
              // console.log(err);
            }
          })
          .then(() => {
            setTokens('');
            viewTokenBalance();
            alert('충전 완료!');
            handleClose();
          });
      }
    });
  };

  const handleCopyClipBoard = async (obj) => {
    try {
      await navigator.clipboard.writeText(obj.address);
      // console.log('복사 성공');
    } catch (error) {
      // console.log('복사 실패 ' + error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ margin: 20 }}>
        <div className={styles.topBox}>
          <a>
            <BiArrowBack className={styles.back}></BiArrowBack>
          </a>
          <div className={styles.pageTitle}>지갑 정보</div>
          <div style={{ width: 25 }}></div>
        </div>
        <div className={styles.groupBox}>
          <div className={styles.group}>
            <div className={styles.title}>지갑 주소</div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <div className={`${styles.ellipsis} ${styles.content}`}>{address}</div>
              <button className={styles.btn} onClick={() => handleCopyClipBoard({ address })}>
                <AiOutlineCopy size={25}></AiOutlineCopy>
              </button>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.title}>이더리움 잔고</div>
            <div className={styles.content}>{balance ? balance + ' ETH' : '0 ETH'}</div>
            <div style={{ marginTop: 30 }}>
              <Button
                type='button'
                fullWidth
                variant='contained'
                color='primary'
                onClick={chargeEthBalance}
                size='medium'
              >
                충전
              </Button>
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.title}>KIRIN 토큰양</div>
            <div className={styles.content}>{tokenBalance ? tokenBalance + ' KRT' : '0 KRT'}</div>
          </div>
          <div className={styles.group}>
            <div className={styles.title}>KIRIN 토큰 충전하기*</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ flexShrink: 0, width: '70%', maxWidth: 500, marginRight: 10 }}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='tokens'
                  onChange={onChangeTokens}
                  value={tokens}
                  label='숫자만 입력 가능합니다'
                  size='small'
                  style={{ color: '#d2d2d2' }}
                />
              </div>
              <div style={{ flexGrow: 1, maxWidth: 100, minWidth: 40 }}>
                <Button
                  type='button'
                  fullWidth
                  variant='contained'
                  onClick={getToken}
                  disabled={!tokens}
                  size='medium'
                  style={{ height: 40, backgroundColor: '#d2d2d2' }}
                >
                  충전
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>

    // <ThemeProvider theme={theme}>
    //   <div>
    //     <Backdrop
    //       sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //       open={open}
    //       onClick={handleClose}
    //     >
    //       <CircularProgress color="inherit" />
    //     </Backdrop>
    //   </div>
    //   <div className={styles.topBox}>
    //     <a href="/mypage">
    //       <BiArrowBack className={styles.back}></BiArrowBack>
    //     </a>
    //     <div className={styles.pageTitle}>내 지갑!</div>
    //     {"\u00A0"}
    //   </div>
    //   <div>
    //     <Container component="main" maxWidth="lg" m={2} disableGutters={true}>
    //       <Grid container alignItems="center" justify="center" spacing={2} p={2}>
    //         <Grid item xs={6}>
    //           <Typography sx={{ ml: 0.5, mb: 0.5 }}>지갑 주소</Typography>
    //         </Grid>
    //         <Grid item xs={6}>
    //           <Typography sx={{ ml: 0.5, mb: 0.5 }}>{address.substr(0, 15) + "..."}</Typography>
    //         </Grid>

    //         <Grid item xs={6}>
    //           <Typography sx={{ ml: 0.5, mb: 0.5 }}>이더리움 잔고</Typography>
    //         </Grid>
    //         <Grid item xs={3}>
    //           <Typography sx={{ ml: 0.5, mb: 0.5 }}>
    //             {balance ? balance + " ETH" : "0 ETH"}
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={3}>
    //           <Button
    //             type="button"
    //             fullWidth
    //             variant="contained"
    //             color="primary"
    //             onClick={chargeEthBalance}
    //             size="medium"
    //           >
    //             충전
    //           </Button>
    //         </Grid>
    //         <Grid item xs={6}>
    //           <Typography sx={{ ml: 0.5, mt: 1, mb: 0.5 }}>KIRIN 토큰양</Typography>
    //         </Grid>
    //         <Grid item xs={6}>
    //           <Typography sx={{ ml: 0.5, mb: 0.5 }}>
    //             {tokenBalance ? tokenBalance + " KRT" : "0 KRT"}
    //           </Typography>
    //         </Grid>
    //         <Grid item xs={12}>
    //           <Typography sx={{ ml: 0.5, mt: 1 }}>KIRIN 토큰 충전하기*</Typography>
    //         </Grid>
    //         <Grid item xs={9} sm={9}>
    //           <TextField
    //             variant="outlined"
    //             required
    //             fullWidth
    //             id="tokens"
    //             onChange={onChangeTokens}
    //             value={tokens}
    //             label="숫자만 입력 가능합니다"
    //             size="small"
    //           />
    //         </Grid>
    //         <Grid item xs={3} sm={3}>
    //           <Button
    //             type="button"
    //             fullWidth
    //             variant="contained"
    //             color="primary"
    //             onClick={getToken}
    //             disabled={!tokens}
    //             size="medium"
    //           >
    //             충전
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Container>
    //   </div>
    // </ThemeProvider>
  );
}

export default WalletPage;
