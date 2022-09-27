import React, { Suspense, useContext, useRef, useState } from 'react';
import Context from '../utils/Context';

function PreviewPage() {
  const videoRef = useRef(null);
  const checkRef = useRef(null);
  const [check, setCheck] = useState(false);
  const { blob } = useContext(Context);
  const handleClick = () => {
    if (videoRef.current) {
      if (checkRef.current) {
        videoRef.current.pause();
        checkRef.current = false;
      } else {
        videoRef.current.play();
        checkRef.current = true;
      }
    }
  };
  return (
    <div>
      <div>헤더</div>
      {blob ? (
        <video
          ref={videoRef}
          src={URL.createObjectURL(blob)}
          style={{ width: '100%', height: '100%' }}
          onClick={handleClick}
        ></video>
      ) : (
        ''
      )}
    </div>
  );
}

export default PreviewPage;
