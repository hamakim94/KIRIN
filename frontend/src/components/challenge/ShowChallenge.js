import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import ReactPlayer from 'react-player';

function ShowChallenge(props) {
  const [challenges, setChallenges] = useState([]);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    UseAxios.get(`/challenges?scope=general&order=random&challengeid={challengeid}`, {
      params: { challengeId: props.data.challengeId },
    }).then((res) => {
      setChallenges(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <div>{props.data.user.id}</div>
      <div>
        <ReactPlayer
          className={props.styles.reactPlayer}
          url={`/files/${props.data.user.video}`}
          width="100%"
          height="100%"
          playing={hover}
          controls={false}
          volume={0.1}
        />
      </div>
    </div>
  );
}

export default ShowChallenge;
