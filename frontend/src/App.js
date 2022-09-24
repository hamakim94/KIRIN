import './App.css';
import { isMobile } from 'react-device-detect';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import SavanaPage from './pages/SavanaPage';
import DonationPage from './pages/DonationPage';
import PlusPage from './pages/PlusPage';
import StarPage from './pages/StarPage';
import PcPage from './pages/PcPage';
import MyPage from './pages/MyPage';
import SettingPage from './pages/SettingPage';
import EditProfilePage from './pages/settings/EditProfilePage';
import AskPage from './pages/settings/AskPage';
import ChangePasswordPage from './pages/settings/ChangePasswordPage';
import TermsOfServicePage from './pages/settings/TermsOfServicePage';
import PrivacyPolicyPage from './pages/settings/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';
import WalletPage from './pages/WalletPage';
import SimpleBottomNavigation from './components/common/SimpleBottomNavigation';
import CommunityPage from './pages/CommunityPage';
import BlockchainPage from './pages/BlockchainPage';
import TransactionPage from './pages/TransactionPage';
import DashboardPage from './pages/DashboardPage';
import FindPasswordPage from './pages/FindPasswordPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
function App() {
  return (
    <>
      {isMobile ? (
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/search" element={<SearchPage></SearchPage>}></Route>
            <Route path="/savana" element={<SavanaPage></SavanaPage>}></Route>
            <Route path="/plus" element={<PlusPage></PlusPage>}></Route>
            <Route path="/donation" element={<DonationPage></DonationPage>}></Route>
            <Route path="/star/:starId" element={<StarPage></StarPage>}></Route>
            <Route path="/star/:starId/community" element={<CommunityPage></CommunityPage>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
            <Route path="/mypage" element={<MyPage></MyPage>}></Route>
            <Route path="/mypage/setting" element={<SettingPage></SettingPage>}></Route>
            <Route path="/dashboard" element={<DashboardPage></DashboardPage>}></Route>
            <Route path="/dashboard/blockchain" element={<BlockchainPage></BlockchainPage>}></Route>
            <Route
              path="/dashboard/transaction"
              element={<TransactionPage></TransactionPage>}
            ></Route>
            <Route
              path="/mypage/setting/editprofile"
              element={<EditProfilePage></EditProfilePage>}
            ></Route>
            <Route
              path="/mypage/setting/changepassword"
              element={<ChangePasswordPage></ChangePasswordPage>}
            ></Route>
            <Route path="/mypage/setting/ask" element={<AskPage></AskPage>}></Route>
            <Route
              path="/mypage/setting/termsofservice"
              element={<TermsOfServicePage></TermsOfServicePage>}
            ></Route>
            <Route
              path="/mypage/setting/privacypolicy"
              element={<PrivacyPolicyPage></PrivacyPolicyPage>}
            ></Route>
            <Route path="/mypage/wallet" element={<WalletPage></WalletPage>}></Route>
            <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route path="/findpassword" element={<FindPasswordPage></FindPasswordPage>}></Route>
          </Routes>
          <SimpleBottomNavigation></SimpleBottomNavigation>
        </div>
      ) : (
        <div className="Pc">
          <PcPage></PcPage>
        </div>
      )}
    </>
  );
}

export default App;