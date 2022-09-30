import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';

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
          <img className={props.styles.starImg} src={`/files/${props.data.user.profileImg}`}></img>

          <div className={props.styles.starName}>{props.data.user.nickname}</div>
        </div>

        <div className={props.styles.starInfo}>{props.data.info}</div>
      </div>
    </div>
  );
}

export default ChallengeStarProfile;
