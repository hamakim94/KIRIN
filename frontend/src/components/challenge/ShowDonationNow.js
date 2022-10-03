import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';

function ShowDonationNow(props) {
  const [realDoners, setRealDoners] = useState([]);

  useEffect(() => {
    UseAxios.get(`/challenges/star`, { params: { challengeId: props.data.challengeId } }).then(
      (res) => {
        setRealDoners(res.data.donors.filter((donor) => donor.amount > 0));
      }
    );
  }, [props.data.challengeId]);
  // var idx;
  // 하나의 블록
  function DonationBox({ donor, key }) {
    return (
      <div className={props.styles.medalBox}>
        <div className={props.styles.medalmedal}>
          <img
            className={props.styles.nowImg}
            alt='사진'
            src={
              donor.profile
                ? `/files/${donor.profile}`
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
          ></img>
          <div className={props.styles.nameTocken}>
            <div>{donor.nickname}</div>
            <div>
              {donor.amount}
              {` `}KRT
            </div>
          </div>
        </div>
        <div className={props.styles.number}>{donor.idx + 1}위</div>
      </div>
    );
  }
  function filterDonor(data) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      let temp = realDoners[i];
      temp.idx = i;
      arr.push(temp);
      if (i >= 5) break;
    }
    return arr;
  }

  return (
    <div className={props.styles.nowTop}>
      {realDoners.length ? (
        filterDonor(realDoners).map((donor, index) => (
          <DonationBox donor={donor} key={index}></DonationBox>
        ))
      ) : (
        <div>아직 기부한 사람이 아무도 없습니다</div>
      )}
    </div>
  );
}

export default ShowDonationNow;
