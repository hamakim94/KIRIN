import React from "react";
import styles from "./HomePage.module.css";
import SubscribeList from "../components/home/SubscribeList";
import HomeCategory from "../components/home/HomeCategory";
import ChallengeList from "../components/home/ChallengeList";
function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>로고</div>
      <SubscribeList styles={styles}></SubscribeList>
      <HomeCategory title={"인기순"} styles={styles}></HomeCategory>
      <ChallengeList styles={styles}></ChallengeList>
      <img className={styles.img} alt='함께' src={require("../assets/img/together.png")}></img>
      <HomeCategory title={"최신순"} styles={styles}></HomeCategory>
      <ChallengeList styles={styles}></ChallengeList>
    </div>
  );
}

export default HomePage;
