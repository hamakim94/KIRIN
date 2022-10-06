import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../common/ProfileImg';

function SearchStar(props) {
  const navigate = useNavigate();
  return (
    <div className={props.styles.starContainer} onClick={() => navigate(`/star/${props.star.id}`)}>
      <ProfileImg src={props.star.profileImg} size={'95px'} />
      <span>{props.star.nickname}</span>
    </div>
  );
}

export default SearchStar;
