import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import ReactPlayer from 'react-player';

function ShowChallenge(props) {
  const [challenges, setChallenges] = useState([]);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    UseAxios.get(`/challenges?scope=all&order=latest`, {
      params: { challengeId: props.data.challengeId },
    }).then((res) => {
      setChallenges(res.data);
      console.log(res.data);
      console.log(props.data);
    });
  }, []);

  return (
    <div className={props.styles.showshow}>
      <div
        className={props.styles.cardWrapper}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <div className={props.styles.coverBox}>{props.data.currentNum}회</div>
        <ReactPlayer
          className={props.styles.reactPlayer}
          width={'33.3333vw'}
          height={200}
          url={`/files/${props.data.video}`}
          playing={hover}
          controls={false}
          playsinline
          volume={0}
        />
      </div>
      {challenges
        ? challenges.map((challenge) => (
            <div
              className={props.styles.cardWrapper}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            >
              <div className={props.styles.coverBox}>{props.data.currentNum}회</div>
              <ReactPlayer
                className={props.styles.reactPlayer}
                url={`/files/${challenge.video}`}
                width={'33.3333vw'}
                height={200}
                playing={hover}
                controls={false}
                volume={0.1}
              />
            </div>
          ))
        : ''}
    </div>
  );
}

export default ShowChallenge;
