import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function AskPage() {
  return (
    <div>
      <a href="/mypage/setting">
        <BiArrowBack></BiArrowBack>
      </a>
      <div>문의하기</div>
      <div>
        <AiFillSetting></AiFillSetting>
      </div>
    </div>
  );
}

export default AskPage;
