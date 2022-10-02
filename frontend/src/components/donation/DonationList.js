import Donation from './Donation.json';
import { Stack, Pagination, Divider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import UseAxios from '../../utils/UseAxios';
import Context from '../../utils/Context';
import ProfileImg from '../common/ProfileImg';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC947',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  typography: {
    fontFamily: 'SCD400',
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

function DonationList(props) {
  const { pathname } = useLocation();
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    UseAxios.get(`/challenges/participate`, {}).then((res) => {
      setDonations(res.data);
      console.log(res);
    });
  }, []);

  const LAST_PAGE =
    donations.length % 5 === 0
      ? parseInt(donations.length / 5)
      : parseInt(donations.length / 5) + 1; // 마지막 페이지
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
  const [data, setData] = useState([]);

  useEffect(() => {
    // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
    // 한 페이지에 5개씩 보여준다.
    if (page === LAST_PAGE) {
      // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
      setData(donations.slice(5 * (page - 1)));
    } else {
      setData(donations.slice(5 * (page - 1), 5 * (page - 1) + 5));
    }
  }, [page, donations]);

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems='center'>
        <Stack direction='row' justifyContent='center' sx={{ flexWrap: 'wrap' }}>
          {donations.length === 0 ? (
            <div style={{ height: '50px', marginLeft: '10px', marginTop: '20PX' }}>
              참여한 챌린지가 없습니다.
            </div>
          ) : (
            data.map((donation) => {
              return (
                <Stack key={donation.id} style={{ width: '100%' }}>
                  <hr style={{ margin: 0 }} />
                  <div className={props.styles.donationBox}>
                    <div className={props.styles.profileImgName}>
                      <ProfileImg
                        src={donation.starProfile}
                        size={'55px'}
                        onClick={() => navigate(`/star/${donation.starId}`)}
                      />
                      <div className={props.styles.starName}>{donation.starNickname}</div>
                    </div>
                    <div>
                      <div className={props.styles.participateBox}>
                        {donation.myDonation === 0 ? (
                          <div
                            className={props.styles.participateKind}
                            style={{ backgroundColor: '#ffffcc' }}
                          >
                            <span>챌린지 참여</span>
                          </div>
                        ) : (
                          <div
                            className={props.styles.participateKind}
                            style={{ backgroundColor: '#ffe5cc' }}
                          >
                            {donation.myDonation}KRT
                          </div>
                        )}
                      </div>
                      <div className={props.styles.challengeTitle}>{donation.title}</div>
                      <div className={props.styles.donationName}>
                        {donation.donationOrganizationName}
                      </div>
                      <div className={props.styles.progressBox}>
                        <ProgressBar
                          styles={props.styles}
                          width={200}
                          percent={donation.currentNum / donation.targetNum}
                        ></ProgressBar>
                        {donation.isProceeding === true ? (
                          <div className={props.styles.donateIng}>진행중</div>
                        ) : (
                          <div className={props.styles.donateEnd}> 종료</div>
                        )}
                      </div>
                      <div>
                        <div className={props.styles.infoBot}>
                          <span className={props.styles.donateNumber}>{donation.currentNum}명</span>
                          <span className={props.styles.donatePercent}>
                            {((donation.currentNum / donation.targetNum) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Stack>
              );
            })
          )}
        </Stack>
        <hr style={{ width: '100%' }} />
        <Pagination
          count={LAST_PAGE}
          defaultPage={1}
          boundaryCount={2}
          size='medium'
          sx={{ mt: 3, mb: 3 }}
          onChange={(e) => handlePage(e)}
          className={props.styles.pagination}
          hideNextButton={true}
          hidePrevButton={true}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default DonationList;
