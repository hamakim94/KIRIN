import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function TermsOfServicePage() {
  return (
    <div>
      <div>
        <a href="/mypage/setting">
          <BiArrowBack></BiArrowBack>
        </a>
        <div>서비스 이용약관</div>
        <div>
          <AiFillSetting></AiFillSetting>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
