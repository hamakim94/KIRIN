import React from "react";
import BackButton from "../components/common/BackButton";
import styles from "./CommunityPage.module.css";
function CommunityPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topWrapper}>
        <div>
          <BackButton></BackButton>
        </div>
        <div>
          <span>새콤달콤</span>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
