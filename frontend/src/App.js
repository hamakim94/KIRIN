import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import FlowPage from "./pages/FlowPage";
import DonationPage from "./pages/DonationPage";
import PlusPage from "./pages/PlusPage";
import NotFoundPage from "./pages/NotFoundPage";
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/search' element={<SearchPage></SearchPage>}></Route>
        <Route path='/flow' element={<FlowPage></FlowPage>}></Route>
        <Route path='/plus' element={<PlusPage></PlusPage>}></Route>
        <Route path='/donation' element={<DonationPage></DonationPage>}></Route>
        <Route path='*' element={<NotFoundPage></NotFoundPage>}></Route>
        {/* <Route path='/mypage' element={<SearchPage></SearchPage>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
