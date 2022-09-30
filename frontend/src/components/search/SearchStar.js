import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchStar(props) {
  const navigate = useNavigate();
  return (
    <div className={props.styles.starContainer} onClick={() => navigate(`/star/${props.star.id}`)}>
      <img
        alt='star'
        className={props.styles.starImg}
        src={
          props.star.profileImg
            ? `/files/${props.star.profileImg}`
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
      ></img>
      <span>{props.star.nickname}</span>
    </div>
  );
}

export default SearchStar;
