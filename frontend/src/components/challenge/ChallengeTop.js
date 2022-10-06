import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';

function ChallengeTop(props) {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    UseAxios.get(`/challenges/star`, { params: { challengeId: props.data.challengeId } }).then(
      (res) => {
        setChallenges(res.data);
      }
    );
  }, []);
  return (
    <div className={props.styles.topBox}>
      <a>
        <BiArrowBack className={props.styles.back}></BiArrowBack>
      </a>
      <div className={props.styles.pageTitle}>{props.data.title}</div>
      <div style={{ width: '25px' }}></div>
    </div>
  );
}

export default ChallengeTop;
