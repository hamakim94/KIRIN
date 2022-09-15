import React from "react";

function PcPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <img
        alt="기린기린"
        src="https://cdn.pixabay.com/photo/2018/04/19/21/17/giraffe-3334355_960_720.jpg"
        height={"80%"}
      ></img>
      <p>아쉽게도 PC페이지는 존재하지 않아요~ 모바일 환경에서 접속해주세요</p>
    </div>
  );
}

export default PcPage;
