import './App.css';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import FlowPage from './pages/FlowPage';
import DonationPage from './pages/DonationPage';
import PlusPage from './pages/PlusPage';
import MyPage from './pages/MyPage';
import SettingPage from './pages/SettingPage';
import EditProfilePage from './pages/settings/EditProfilePage';
import AskPage from './pages/settings/AskPage';
import ChangePasswordPage from './pages/settings/ChangePasswordPage';
import TermsOfServicePage from './pages/settings/TermsOfServicePage';
import PrivacyPolicyPage from './pages/settings/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/search" element={<SearchPage></SearchPage>}></Route>
        <Route path="/flow" element={<FlowPage></FlowPage>}></Route>
        <Route path="/plus" element={<PlusPage></PlusPage>}></Route>
        <Route path="/donation" element={<DonationPage></DonationPage>}></Route>
        <Route path="/mypage" element={<MyPage></MyPage>}></Route>
        <Route path="/mypage/setting" element={<SettingPage></SettingPage>}></Route>
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
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        {/* <Route path='/mypage' element={<SearchPage></SearchPage>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
