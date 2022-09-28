import React from "react";
import SearchStar from "./SearchStar";

function SearchList(props) {
  return (
    <div className={props.styles.searchContainer}>
      {props.starList.map((star) => (
        <SearchStar styles={props.styles} star={star} key={star.id}></SearchStar>
      ))}
    </div>
  );
}

export default SearchList;
