import React from 'react';

function FinishSignupPage() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '250px', fontSize: '20px' }}>로고</div>
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>
        회원가입이 완료되었습니다.
      </div>
      <div href="/login" style={{ textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>
        이메일 인증 후 로그인해주세요.
      </div>
      <a></a>
    </div>
  );
}

export default FinishSignupPage;
