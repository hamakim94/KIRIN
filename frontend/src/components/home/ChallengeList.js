import React from "react";
import ChallengeCard from "./ChallengeCard";
function ChallengeList(props) {
  return (
    <div
      className={`${props.styles.challengeContainer} ${props.styles.hScroll}`}
    >
      <ChallengeCard></ChallengeCard>
    </div>
  );
}

export default ChallengeList;
