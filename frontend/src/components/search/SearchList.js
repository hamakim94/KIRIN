import React from "react";
import SearchStar from "./SearchStar";
function SearchList(props) {
  const searchData = [];
  for (let i = 0; i < 10; i++) {
    searchData.push(<SearchStar styles={props.styles}></SearchStar>);
  }
  return <div className={props.styles.searchContainer}>{searchData}</div>;
}

export default SearchList;
