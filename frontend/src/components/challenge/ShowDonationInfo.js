import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC947',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
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

function ShowDonationInfo(props) {
  const [realDonors, setRealDonors] = useState([]);
  useEffect(() => {
    UseAxios.get(`/challenges/star`, { params: { challengeId: props.data.challengeId } }).then(
      (res) => {
        setRealDonors(res.data.donors.filter((donor) => donor.amount > 0));
      }
    );
  }, [props.data.challengeId]);

  return realDonors ? (
    <ThemeProvider theme={theme}>
      <div className={props.styles.infoTop}>
        <div className={props.styles.infoSet}>
          <div className={props.styles.donationInfo}>기부 기관</div>
          <div>{props.data.donationOrganizationName}</div>
        </div>
        <div className={props.styles.infoSet}>
          <div className={props.styles.donationInfo}>챌린지 기간</div>
          <div>
            {props.data.startDate.split('T')[0]} {` ~ `} {props.data.endDate.split('T')[0]}
          </div>
        </div>
        <div className={props.styles.infoSet}>
          <div className={props.styles.donationInfo}>챌린지 목표</div>
          <div>{props.data.targetNum}명</div>
        </div>
        <div className={props.styles.infoSet}>
          <div className={props.styles.donationInfo}>챌린지 참여</div>
          {props.data.currentNum}명(
          {((props.data.currentNum / props.data.targetNum) * 100).toFixed(1)}
          %)
        </div>
        <div className={props.styles.infoSet}>
          <div className={props.styles.donationInfo}>기부 참여</div>
          <div>{realDonors.length}명</div>
        </div>
        <div className={props.styles.infoSet}>
          <div className={props.styles.donationInfo}>기부 현황</div>
          <div>
            {props.data.currentAmount - props.data.targetAmount}
            {` `}KRT
          </div>
        </div>
        <div className={props.styles.infoSet}>
          <div className={props.styles.donationInfo}>공약 금액</div>
          <div>
            {props.data.targetAmount}
            {` `}KRT
          </div>
        </div>
        <div className={props.styles.progressBox}>
          <ProgressBar
            styles={props.styles}
            height
            width={'80vw'}
            percent={props.data.currentNum / props.data.targetNum}
          ></ProgressBar>
        </div>
        <div className={props.styles.infoBot}>
          <span className={props.styles.infoText}>{props.data.currentNum}명</span>
          <span className={props.styles.infoText}>
            {((props.data.currentNum / props.data.targetNum) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </ThemeProvider>
  ) : (
    ''
  );
}

export default ShowDonationInfo;
