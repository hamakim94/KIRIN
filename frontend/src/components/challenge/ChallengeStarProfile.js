import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import ProfileImg from '../common/ProfileImg';

function ChallengeStarProfile(props) {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    UseAxios.get(`/challenges/star`, { params: { challengeId: props.data.challengeId } }).then(
      (res) => {
        setChallenges(res.data);
      }
    );
  }, []);

  return (
    <div>
      <div className={props.styles.profileBox}>
        <div className={props.styles.imgName}>
          <ProfileImg src={props.data.user.profileImg} size={'100px'}></ProfileImg>
          <div className={props.styles.starName}>{props.data.user.nickname}</div>
        </div>

        <div className={props.styles.starInfo}>{challenges.info}</div>
      </div>
    </div>
  );
}

export default ChallengeStarProfile;
