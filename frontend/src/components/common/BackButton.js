import { AiOutlineLeft } from 'react-icons/ai';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const style = { marginRight: 10, display: 'flex', justifyContent: 'center' };
function BackButton() {
  const navigate = useNavigate();
  return (
    <>
      <AiOutlineLeft onClick={() => navigate(-1)} style={style} size={20}></AiOutlineLeft>
    </>
  );
}

export default BackButton;
