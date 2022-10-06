import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import { useNavigate } from 'react-router-dom';

function ShowChallenge(props) {
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    UseAxios.get(`/challenges?scope=all&order=latest`, {
      params: { challengeId: props.data.challengeId },
    }).then((res) => {
      setChallenges(res.data);
    });
  }, []);

  return (
    <div className={props.styles.showshow}>
      {challenges
        ? challenges.map((challenge) => (
            <div
              className={props.styles.cardWrapper}
              onClick={() =>
                navigate(`/savana/4`, {
                  state: {
                    id: challenge.id,
                    challengeId: challenge.challengeId,
                  },
                })
              }
            >
              <img
                src={`/files/${challenge.thumbnail}`}
                width={window.innerWidth / 3}
                height={215}
                style={{ objectFit: 'cover' }}
              ></img>
            </div>
          ))
        : ''}
    </div>
  );
}

export default ShowChallenge;
