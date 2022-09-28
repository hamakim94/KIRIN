import React, { useEffect, useState } from "react";
import ChallengeList from "../components/home/ChallengeList";
import HomeCategory from "../components/home/HomeCategory";
import CommunityItem from "../components/star/CommunityItem";
import styles from "./StarPage.module.css";
import UseAxios from "../utils/UseAxios";

function StarPage() {
  const [starInfo, setStarInfo] = useState({});
  useEffect(() => {
    const location = window.location.href.split("/");
    const starId = Number(location[location.length - 1]);
    UseAxios.get(`/users/stars/${starId}`).then((res) => {
      setStarInfo(res.data);
      console.log(starInfo);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className={styles.topWrapper}>
        {/* 커버사진 */}
        <div
          style={{
            height: "150px",
            backgroundImage: `url(${process.env.REACT_APP_BASEURL}/files/${starInfo.backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            left: "15px",
            bottom: "0",
            backgroundImage: `url(${process.env.REACT_APP_BASEURL}/files/${starInfo.profileImg})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "100%",
            width: "100px",
            height: "100px",
            border: "1px solid rgba(0,0,0)",
          }}
        ></div>{" "}
        {/* 프로필사진 */}
      </div>
      <div className={styles.topTitle}>
        <div className={styles.starName}>
          <span>{starInfo.nickname}</span>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.subBtn}>구독</button>
        </div>
      </div>
      <div className={styles.contentBox}>{starInfo.info ? starInfo.info : "없졍"}</div>
      <div className={styles.titleBox}>
        <HomeCategory title={"챌린지"} styles={styles}></HomeCategory>
        <div className={styles.sortTab}>
          <span>최신순</span>
          <span>인기순</span>
        </div>
      </div>
      <ChallengeList styles={styles}></ChallengeList>
      <div className={styles.titleBox}>
        <HomeCategory title={"커뮤니티"} styles={styles}></HomeCategory>
      </div>
      <div className={styles.hScroll}>
        <CommunityItem styles={styles}></CommunityItem>
        <CommunityItem styles={styles}></CommunityItem>
        <CommunityItem styles={styles}></CommunityItem>
        <CommunityItem styles={styles}></CommunityItem>
      </div>
    </div>
  );
}

export default StarPage;
