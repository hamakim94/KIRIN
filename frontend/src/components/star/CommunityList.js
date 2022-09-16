import React from "react";
import CommunityItem from "./CommunityItem";

function CommunityList() {
  return (
    <div className={styles.hScroll}>
      <CommunityItem styles={styles}></CommunityItem>
      <CommunityItem styles={styles}></CommunityItem>
      <CommunityItem styles={styles}></CommunityItem>
      <CommunityItem styles={styles}></CommunityItem>
    </div>
  );
}

export default CommunityList;
