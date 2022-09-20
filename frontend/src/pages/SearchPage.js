import React, { useState } from "react";
import styles from "./SearchPage.module.css";
import BackButton from "../components/common/BackButton";
import SearchList from "../components/search/SearchList";
function SearchPage() {
  const [starName, setStarName] = useState("");
  return (
    <div>
      <div className={styles.topContainer}>
        <BackButton></BackButton>
        <input
          className={styles.searchBox}
          value={starName}
          onChange={(e) => setStarName(e.target.value)}
          type={"text"}
          placeholder={"검색"}
        ></input>
      </div>
      <SearchList styles={styles}></SearchList>
    </div>
  );
}

export default SearchPage;
