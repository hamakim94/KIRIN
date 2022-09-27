import React from 'react';

function ShowDonationInfo(props) {
  return (
    <div className={props.styles.infoTop}>
      <div className={props.styles.infoSet}>
        <div className={props.styles.donationInfo}>기부 기관</div>
        <div>고아원</div>
      </div>
      <div className={props.styles.infoSet}>
        <div className={props.styles.donationInfo}>챌린지 목표</div>
        <div>고아원</div>
      </div>
      <div className={props.styles.infoSet}>
        <div className={props.styles.donationInfo}>챌린지 목표</div>
        <div>고아원</div>
      </div>
      <div className={props.styles.infoSet}>
        <div className={props.styles.donationInfo}>기부 참여</div>
        <div>고아원</div>
      </div>
      <div className={props.styles.infoSet}>
        <div className={props.styles.donationInfo}>기부 현황</div>
        <div>고아원</div>
      </div>
      <div className={props.styles.infoSet}>
        <div className={props.styles.donationInfo}>공약 금액</div>
        <div>고아원</div>
      </div>
      <div>진행 그래프</div>
    </div>
  );
}

export default ShowDonationInfo;
