import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function PrivacyPolicyPage() {
  return (
    <div>
      <div>
        <a href="/mypage/setting">
          <BiArrowBack></BiArrowBack>
        </a>
        <div>개인정보 처리방침</div>
        <div>
          <AiFillSetting></AiFillSetting>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
