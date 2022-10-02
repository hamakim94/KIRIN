import React, { useEffect, useState } from 'react';
import styles from './SearchPage.module.css';
import SearchList from '../components/search/SearchList';
import UseAxios from '../utils/UseAxios';
import Header from '../components/common/Header';
function SearchPage() {
  const [starName, setStarName] = useState('');
  const [starList, setStarList] = useState([]);
  const [filteredStarList, setFilteredStarList] = useState([]);

  useEffect(() => {
    UseAxios.get('/users/stars')
      .then((res) => {
        setFilteredStarList(res.data);
        setStarList(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = starList.filter((star) => {
        const starData = star.nickname ? star.nickname.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return starData.indexOf(textData) > -1;
      });
      setFilteredStarList(newData);
      setStarName(text);
    } else {
      setFilteredStarList(starList);
      setStarName(text);
    }
  };

  return (
    <div className='wrapper'>
      <Header title={'스타 검색'}></Header>
      <div className={styles.topContainer}>
        <input
          className={styles.searchBox}
          value={starName}
          onChange={(e) => searchFilter(e.target.value)}
          type={'text'}
          placeholder={'검색'}
        ></input>
      </div>
      <SearchList styles={styles} starList={filteredStarList}></SearchList>
    </div>
  );
}

export default SearchPage;
