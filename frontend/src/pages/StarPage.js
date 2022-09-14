import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import styles from "./StarPage.module.css";

function StarPage() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#FFB200",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <div className={styles.coverImg}></div> {/* 커버사진 */}
          <div className={styles.starImg}></div> {/* 프로필사진 */}
        </div>
        <div style={styles}>
          <span>기린기린</span>
          <Button variant='contained' color='secondary'>
            구독
          </Button>
        </div>{" "}
        {/* 설명 */}
        <div style={styles}></div> {/* 타이틀 */}
        <div style={styles}></div> {/* 오른쪽 */}
        <div style={styles}></div> {/* 챌린지카드 */}
        <div style={styles}></div> {/* 타이틀 */}
        <div style={styles}></div> {/* 커뮤니티 */}
      </div>
    </ThemeProvider>
  );
}

export default StarPage;
