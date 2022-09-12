import React, { useEffect, useState } from 'react';
import Donation from './Donation.json';

function ProgressBar(props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const newValue = props.width * props.percent;
    setValue(newValue);
  }, [props.width, props.percent]);
  return (
    <div className={props.styles.progressDiv} style={{ width: props.width }}>
      <div style={{ width: `${value}px` }} className={props.styles.progress} />
    </div>
  );
}

function DonationList(props) {
  return (
    <div>
      {Donation.donationLists.map((donationList) => (
        <div>
          <hr></hr>
          <div className={props.styles.donationBox}>
            <div className={props.styles.profileImgName}>
              <img src={donationList.img} className={props.styles.starImg}></img>
              <div className={props.styles.starName}>{donationList.name}</div>
            </div>
            <div>
              <div className={props.styles.participateBox}>
                <div className={props.styles.participateChallenge}> 챌린지 참여 </div>
                {donationList.didDonate === 1 ? (
                  <div className={props.styles.participateDonation}>기부참여</div>
                ) : null}
              </div>
              <div className={props.styles.challengeTitle}>{donationList.title}</div>
              {donationList.didDonate === 1 ? (
                <div className={props.styles.donateAmount}>{donationList.donateAmount}원?</div>
              ) : (
                <div className={props.styles.donateAmountZero}>쿠쿠루삥뽕</div>
              )}
              <div className={props.styles.progressBox}>
                <ProgressBar styles={props.styles} width={200} percent={0.7}></ProgressBar>
                {donationList.ing === 1 ? (
                  <div className={props.styles.donateIng}>진행중</div>
                ) : (
                  <div className={props.styles.donateEnd}>종료</div>
                )}
              </div>

              <div>
                <div className={props.styles.infoBot}>
                  <span>{donationList.donateNum}명</span>
                  <span className={props.styles.donatePercent}>
                    {donationList.donateNum}/{donationList.targetNum}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DonationList;
