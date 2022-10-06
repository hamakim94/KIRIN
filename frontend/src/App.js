import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SavanaPage from './pages/SavanaPage';
import DonationPage from './pages/DonationPage';
import StarPage from './pages/StarPage';
import PlusPage from './pages/PlusPage';
import MyPage from './pages/MyPage';
import SettingPage from './pages/SettingPage';
import EditProfilePage from './pages/settings/EditProfilePage';
import AskPage from './pages/settings/AskPage';
import ChangePasswordPage from './pages/settings/ChangePasswordPage';
import TermsOfServicePage from './pages/settings/TermsOfServicePage';
import PrivacyPolicyPage from './pages/settings/PrivacyPolicyPage';
import ChallengePage from './pages/ChallengePage';
import CommunityPage from './pages/CommunityPage';
import BlockchainPage from './pages/BlockchainPage';
import TransactionPage from './pages/TransactionPage';
import DashboardPage from './pages/DashboardPage';
import RegisterPage from './pages/RegisterPage';
import StarCreatePage from './pages/StarCreatePage';
import WalletPage from './pages/WalletPage';
import CommunityCreatePage from './pages/CommunityCreatePage';
import NotFoundPage from './pages/NotFoundPage';
import SimpleBottomNavigation from './components/common/SimpleBottomNavigation';
import PcPage from './pages/PcPage';
import FindPasswordPage from './pages/FindPasswordPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FinishSignupPage from './pages/FinishSignupPage';
import ContractDeploy from './pages/ContractDeploy';
import Context from './utils/Context';
import UseAxios from './utils/UseAxios';
import { Cookies } from 'react-cookie';
import SuccessPage from './pages/SuccessPage';
import FailPage from './pages/FailPage';
import StarSignupPage from './pages/StarSignupPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const urlRef = useRef(null);
  const idRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [userId, setuserId] = useState(null);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const value = cookies.get('accesstoken');

  useEffect(() => {
    if (value) {
      UseAxios.get(`/users/profiles`).then((res) => {
        setUserData(res.data);
        setuserId(res.data.id);
      });
    }
  }, [value]);
  useEffect(() => {
    let sseEvents;
    if (userId) {
      sseEvents = new EventSource(`/api/notify/subscribe?userId=${userId}`, {
        withCredentials: true,
      });

      sseEvents.onopen = () => {
        // 연결 됐을 때
      };
      sseEvents.onerror = (event) => {
        // 에러 났을 때
      };
      sseEvents.onmessage = (event) => {
        // 메세지 받았을 때
        const data = JSON.parse(event.data);
        const notify = () =>
          toast(data.event, {
            position: 'top-center',
            autoClose: 60000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            containerId: 'B',
          });
        if (data.length > 1) {
        } else {
          notify();
          urlRef.current = data.link;
          idRef.current = data.id;
        }
      };
    }
    return () => {
      if (sseEvents) {
        sseEvents.close();
      }
    };
  }, [userId]);
  return (
    <>
      {isMobile ? (
        value ? (
          <div className='App'>
            <ToastContainer
              enableMultiContainer
              containerId={'B'}
              onClick={() => {
                const pathname = urlRef.current.split('/');
                navigate(`${urlRef.current}`, {
                  state: { starId: pathname[2], boardId: pathname[4] },
                });
                UseAxios.post('/notify/read', null, {
                  params: { notificationId: idRef.current },
                });
              }}
            />
            <ToastContainer enableMultiContainer containerId={'A'} />
            <Context.Provider
              value={{ blob, setBlob, userData, setUserData, selected, setSelected }}
            >
              <Routes>
                <Route path='/' element={<HomePage></HomePage>}></Route>
                <Route path='/search' element={<SearchPage></SearchPage>}></Route>
                <Route path='/savana/:category' element={<SavanaPage></SavanaPage>}></Route>
                <Route
                  path='/savana/challenge/:challengeId'
                  element={<SavanaPage></SavanaPage>}
                ></Route>
                <Route path='/donation' element={<DonationPage></DonationPage>}></Route>
                <Route path='/plus/:challengeId' element={<PlusPage></PlusPage>}></Route>
                <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
                <Route path='/star/:starId' element={<StarPage></StarPage>}></Route>
                <Route
                  path='/star/:starId/community/:communityId'
                  element={<CommunityPage></CommunityPage>}
                ></Route>
                <Route
                  path='/star/:starId/community/create'
                  element={<CommunityCreatePage></CommunityCreatePage>}
                ></Route>
                <Route
                  path='/challenge/:challengeId'
                  element={<ChallengePage></ChallengePage>}
                ></Route>
                <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
                <Route path='/mypage' element={<MyPage></MyPage>}></Route>
                <Route path='/mypage/setting' element={<SettingPage></SettingPage>}></Route>
                <Route
                  path='/mypage/setting/editprofile'
                  element={<EditProfilePage></EditProfilePage>}
                ></Route>
                <Route
                  path='/mypage/setting/changepassword'
                  element={<ChangePasswordPage></ChangePasswordPage>}
                ></Route>
                <Route path='/mypage/setting/ask' element={<AskPage></AskPage>}></Route>
                <Route
                  path='/mypage/setting/termsofservice'
                  element={<TermsOfServicePage></TermsOfServicePage>}
                ></Route>
                <Route
                  path='/mypage/setting/privacypolicy'
                  element={<PrivacyPolicyPage></PrivacyPolicyPage>}
                ></Route>
                <Route path='/mypage/wallet' element={<WalletPage></WalletPage>}></Route>
                <Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>
                <Route
                  path='/dashboard/blockchain'
                  element={<BlockchainPage></BlockchainPage>}
                ></Route>
                <Route
                  path='/dashboard/transaction'
                  element={<TransactionPage></TransactionPage>}
                ></Route>
                <Route path='/create/deploy' element={<ContractDeploy></ContractDeploy>}></Route>
                <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
                <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                <Route path='/finishsignup' element={<FinishSignupPage></FinishSignupPage>}></Route>
                <Route path='/findpassword' element={<FindPasswordPage></FindPasswordPage>}></Route>
                <Route path='/create' element={<StarCreatePage></StarCreatePage>}></Route>
              </Routes>
              <SimpleBottomNavigation></SimpleBottomNavigation>
            </Context.Provider>
          </div>
        ) : (
          <div className='App'>
            <Context.Provider value={{ blob, setBlob, userData, setUserData }}>
              <Routes>
                <Route path='/' element={<LoginPage></LoginPage>}></Route>
                <Route path='/login' element={<LoginPage></LoginPage>}></Route>
                <Route path='/finishsignup' element={<FinishSignupPage></FinishSignupPage>}></Route>
                <Route path='/findpassword' element={<FindPasswordPage></FindPasswordPage>}></Route>
                <Route path='/signup' element={<SignupPage></SignupPage>}></Route>
                <Route path='/starsignup' element={<StarSignupPage></StarSignupPage>}></Route>
                <Route path='/success' element={<SuccessPage></SuccessPage>}></Route>
                <Route path='/fail' element={<FailPage></FailPage>}></Route>
                <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
              </Routes>
            </Context.Provider>
          </div>
        )
      ) : (
        <div className='Pc'>
          <Routes>
            <Route path='/' element={<PcPage></PcPage>}></Route>
            <Route path='/success' element={<SuccessPage></SuccessPage>}></Route>
            <Route path='/fail' element={<FailPage></FailPage>}></Route>
            <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
