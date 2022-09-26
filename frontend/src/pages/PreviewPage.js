import React, { useContext } from 'react';
import Context from '../utils/Context';

function PreviewPage() {
  const { blob } = useContext(Context);
  console.log(blob);
  return <div>PreviewPage</div>;
}

export default PreviewPage;
