import React from 'react';

function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <img
        alt='기린기린'
        src='https://cdn.pixabay.com/photo/2018/04/19/21/17/giraffe-3334355_960_720.jpg'
        height={'80%'}
      ></img>
      <p style={{ paddingLeft: 30, paddingRight: 30 }}>
        혹시 비정상적인 접근을 하셨나요? 정상적으로 접근해주세용~
      </p>
    </div>
  );
}

export default NotFoundPage;
