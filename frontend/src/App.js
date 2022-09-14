import "./App.css";
import { isMobile } from "react-device-detect";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import FlowPage from "./pages/FlowPage";
import DonationPage from "./pages/DonationPage";
import PlusPage from "./pages/PlusPage";
import StarPage from "./pages/StarPage";
import PcPage from "./pages/PcPage";
import NotFoundPage from "./pages/NotFoundPage";
import SimpleBottomNavigation from "./components/common/SimpleBottomNavigation";
function App() {
  return (
    <>
      {isMobile ? (
        <div className='App'>
          <Routes>
            <Route path='/' element={<HomePage></HomePage>}></Route>
            <Route path='/search' element={<SearchPage></SearchPage>}></Route>
            <Route path='/flow' element={<FlowPage></FlowPage>}></Route>
            <Route path='/plus' element={<PlusPage></PlusPage>}></Route>
            <Route path='/donation' element={<DonationPage></DonationPage>}></Route>
            <Route path='/star/:starId' element={<StarPage></StarPage>}></Route>
            <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
            {/* <Route path='/mypage' element={<SearchPage></SearchPage>}></Route> */}
          </Routes>
          <SimpleBottomNavigation></SimpleBottomNavigation>
        </div>
      ) : (
        <div className='Pc'>
          <PcPage></PcPage>
        </div>
      )}
    </>
  );
}

export default App;
