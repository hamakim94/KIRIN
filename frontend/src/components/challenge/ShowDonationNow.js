import React, { useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';

function ShowDonationNow(props) {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    UseAxios.get(`/challenges/star`, { params: { challengeId: props.data.challengeId } }).then(
      (res) => {
        setChallenges(res.data);
      }
    );
  }, [challenges]);

  const donor = challenges.donors;

  return (
    <div className={props.styles.nowTop}>
      {donor ? (
        <div className={props.styles.nowList}>
          <div>
            {donor[0].amount > 0 ? (
              <div className={props.styles.medalBox}>
                <div className={props.styles.medalmedal}>
                  <img className={props.styles.nowImg} src={`/files/${donor[0].profile}`}></img>
                  <div className={props.styles.nameTocken}>
                    <div>{donor[0].nickname}</div>
                    <div>{donor[0].amount}KRT</div>
                  </div>
                </div>
                <div className={props.styles.number}>1위</div>
              </div>
            ) : null}
            {donor[1].amount > 0 ? (
              <div className={props.styles.medalBox}>
                <div className={props.styles.medalmedal}>
                  <img className={props.styles.nowImg} src={`/files/${donor[1].profile}`}></img>
                  <div className={props.styles.nameTocken}>
                    <div>{donor[1].nickname}</div>
                    <div>{donor[1].amount}KRT</div>
                  </div>
                </div>

                <div className={props.styles.number}>2위</div>
              </div>
            ) : null}

            {donor[2].amount > 0 ? (
              <div className={props.styles.medalBox}>
                <div className={props.styles.medalmedal}>
                  <img className={props.styles.nowImg} src={`/files/${donor[2].profile}`}></img>
                  <div className={props.styles.nameTocken}>
                    <div>{donor[2].nickname}</div>
                    <div>{donor[2].amount}KRT</div>
                  </div>
                </div>
                <div className={props.styles.number}>3위</div>
              </div>
            ) : null}

            {donor[3].amount > 0 ? (
              <div className={props.styles.medalBox}>
                <div className={props.styles.medalmedal}>
                  <img className={props.styles.nowImg} src={`/files/${donor[3].profile}`}></img>
                  <div className={props.styles.nameTocken}>
                    <div>{donor[3].nickname}</div>
                    <div>{donor[3].amount}KRT</div>
                  </div>
                </div>
                <div className={props.styles.number}>4위</div>
              </div>
            ) : null}

            {donor[4].amount > 0 ? (
              <div className={props.styles.medalBox}>
                <div className={props.styles.medalmedal}>
                  <img className={props.styles.nowImg} src={`/files/${donor[4].profile}`}></img>
                  <div className={props.styles.nameTocken}>
                    <div>{donor[4].nickname}</div>
                    <div>{donor[4].amount}KRT</div>
                  </div>
                </div>
                <div className={props.styles.number}>5위</div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>아직 기부한 사람이 아무도 없습니다</div>
      )}
    </div>
  );
}

export default ShowDonationNow;
