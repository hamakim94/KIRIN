import React, { useState, useEffect, useContext } from 'react';
import { Modal } from '@mui/material';
import styles from './WalletModal.module.css';
import { Button, TextField } from '@mui/material/';
import { AiOutlineCopy } from 'react-icons/ai';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UseAxios from '../../utils/UseAxios';
import ABI from '../../TokenABI.json';
import CA from '../../TokenCA.json';
import Context from '../../utils/Context';
import Loading from '../common/Loading';
import Sheet from 'react-modal-sheet';
import Swal2 from 'sweetalert2';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc947',
    },
  },
  typography: {
    fontFamily: 'SCD400',
  },
});
const isLetters = (str) => /^[0-9]*$/.test(str);

// 사용법 :
function WalletModal(props) {
  const { userData } = useContext(Context);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [web3, setWeb3] = useState(''); // web3 연결하는 부분, useEffect를 통해 초반에 생성된다.
  const [tokenBalance, setTokenBalance] = useState(''); // 토큰 잔액
  const [tokenContract, setTokenContract] = useState('');
  const [tokens, setTokens] = useState('');
  const [balance, setBalance] = useState(''); // 잔액
  const [loading, setLoading] = React.useState(false);
  const [isOpen, setOpen] = React.useState(false);

  // 페이지가 실행되면, web3  이용 네트워크 연결)
  useEffect(() => {
    if (userData) {
      var Web3 = require('web3');
      var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
      // var web3 = new Web3(process.env.REACT_APP_TESTURL);
      var contract = new web3.eth.Contract(ABI, CA); // ABI, CA를 통해 contract 객체를 만들어서 보관한다. 나중에 활용함
      setWeb3(web3);
      setTokenContract(contract);
      web3.eth
        .getBalance(userData.walletAddress)
        .then((e) => setBalance(Math.round((e / Math.pow(10, 18)) * 10000) / 10000));
      contract.methods // ABI, CA를 이용해 함수 접근
        .balanceOf(userData.walletAddress)
        .call()
        .then((balance) => {
          setTokenBalance(balance);
          if (props.setData) {
            props.setData(balance);
          }
        });
    }
  }, [userData]);

  // 폼에 숫자만 입력해요
  const onChangeTokens = (e) => {
    const { value } = e.target;
    if (isLetters(value)) {
      setTokens(value);
    }
  };
  /**
   * 계정의 토큰 잔액 확인하는 함수.
   * tokenCA, tokenABI 필요하다(해당 함수는, 이미 데이터를 가지고있음)
   */
  const viewTokenBalance = () => {
    tokenContract.methods // ABI, CA를 이용해 함수 접근
      .balanceOf(userData.walletAddress)
      .call()
      .then((balance) => {
        setTokenBalance(balance);
        if (props.setData) {
          props.setData(balance);
        }
      });
  };
  /**
   * contract를 배포한 admin 계정으로부터 1000 토큰을 받아오는 함수
   * 1000을 나중에 폼으로 수정해, 얼마 충전할지 정할 수 있음
   * encodeIBI를 통해, ABI,CA를 활용한 Contract 자체를 transaction의 data에 넣어서 실행이 가능
   * 준비물 : AdminuserData.walletAddress, Admin AdminPrivateKey, tokenContractCA
   */
  const getToken = () => {
    setLoading(true);
    UseAxios.post(`/blockchain/charge`, null, { params: { amount: tokens } })
      .then((res) => {
        setTokens('');
        viewTokenBalance();
        Swal2.fire({
          width: 100,
          icon: 'success',
          text: 'KRT 충전 완료',
          position: 'top',
          confirmButtonColor: '#ffc947',
          confirmButtonText: '확인',
        });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleCopyClipBoard = async (obj) => {
    try {
      await navigator.clipboard.writeText(obj.userData.walletAddress);
    } catch (error) {}
  };

  return userData ? (
    <ThemeProvider theme={theme}>
      <div>
        <Loading loading={loading}></Loading>
        <Button
          type='button'
          variant='contained'
          className={props.styles.myWallet}
          onClick={() => setOpen(true)}
        >
          {props.buttonTitle}
        </Button>
        <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
          <Sheet.Container style={{ height: '450px', margin: 0, zIndex: 4 }}>
            <Sheet.Header />
            <Sheet.Content style={{ margin: '0px 20px' }} disableDrag={true}>
              {/* <div className={styles.pageTitle}>내 지갑</div> */}
              <div className={styles.groupBox}>
                <div className={styles.group}>
                  <div className={styles.title}>지갑 주소</div>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div className={`${styles.ellipsis} ${styles.content}`}>
                      {userData.walletAddress}
                    </div>
                    <button
                      className={styles.btn}
                      onClick={() => handleCopyClipBoard(userData.walletAddress)}
                    >
                      <AiOutlineCopy size={25}></AiOutlineCopy>
                    </button>
                  </div>
                </div>
                <div className={styles.group}>
                  <div className={styles.title}>KIRIN 토큰양</div>
                  <div className={styles.content}>
                    {tokenBalance ? tokenBalance + ' KRT' : '0 KRT'}
                  </div>
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
                        style={{ height: 40, backgroundColor: '#ffc947' }}
                      >
                        충전
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Sheet.Content>
          </Sheet.Container>
          <Sheet.Backdrop style={{ zIndex: 3, borderWidth: 0 }} onTap={() => setOpen(false)} />
        </Sheet>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '2%',
                backgroundColor: '#ffffff',
                bottom: 0,
              }}
            >
              <div className={styles.pageTitle}>내 지갑</div>

              <div className={styles.groupBox}>
                <div className={styles.group}>
                  <div className={styles.title}>지갑 주소</div>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div className={`${styles.ellipsis} ${styles.content}`}>
                      {userData.walletAddress}
                    </div>
                    <button
                      className={styles.btn}
                      onClick={() => handleCopyClipBoard(userData.walletAddress)}
                    >
                      <AiOutlineCopy size={25}></AiOutlineCopy>
                    </button>
                  </div>
                </div>
                <div className={styles.group}>
                  <div className={styles.title}>KIRIN 토큰양</div>
                  <div className={styles.content}>
                    {tokenBalance ? tokenBalance + ' KRT' : '0 KRT'}
                  </div>
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
                        style={{ height: 40, backgroundColor: '#ffc947' }}
                      >
                        충전
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal> */}
      </div>
    </ThemeProvider>
  ) : (
    ''
  );
}

export default WalletModal;
