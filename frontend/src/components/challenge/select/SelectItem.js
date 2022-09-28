import React from 'react';
import { useNavigate } from 'react-router-dom';

function SelectItem(props) {
  const navigate = useNavigate();
  return (
    <div id={props.styles.listWrapper} onClick={() => navigate('/plus')}>
      <div>왼쪽</div>
      <div>중간</div>
      <div>오른쪽</div>
    </div>
  );
}

export default SelectItem;
