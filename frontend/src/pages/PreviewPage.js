import React, { useContext } from 'react';
import Context from '../utils/Context';

function PreviewPage() {
  const { blob } = useContext(Context);
  console.log(blob);
  return (
    <>
      {blob ? (
        <video autoPlay src={URL.createObjectURL(blob)} style={{ width: '100%', height: '100%' }} />
      ) : (
        ''
      )}
    </>
  );
}

export default PreviewPage;
