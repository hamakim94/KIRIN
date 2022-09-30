import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';

function ShowDonationNow(props) {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    UseAxios.get(`/challenges/star`, { params: { challengeId: props.data.challengeId } }).then(
      (res) => {
        setChallenges(res.data);
        console.log(props.data);
      }
    );
  }, []);

  return (
    <div className={props.styles.nowTop}>
      <div className={props.styles.nowList}>
        <div className={props.styles.medalBox}>
          <img className={props.styles.nowImg} src={props.data.profileImg}></img>

          <div className={props.styles.nameTocken}>
            <div>임나연 채고</div>
            <div>5000토큰</div>
          </div>
        </div>
        <div className={props.styles.number}>1위</div>
      </div>
    </div>
  );
}

export default ShowDonationNow;
