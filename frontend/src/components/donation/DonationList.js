import Donation from "./Donation.json";
import { Stack, Pagination, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFC947",
    },
    secondary: {
      main: "#11cb5f",
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

function DonationList(props) {
  const { pathname } = useLocation();

  const LAST_PAGE =
    Donation.donationLists.length % 5 === 0
      ? parseInt(Donation.donationLists.length / 5)
      : parseInt(Donation.donationLists.length / 5) + 1; // 마지막 페이지
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
  const [data, setData] = useState([]);

  useEffect(() => {
    // setData(/* fetch(또는 전체 데이터에서 slice)로 현재 page의 데이터를 가져온다. */);
    // 한 페이지에 5개씩 보여준다.
    if (page === LAST_PAGE) {
      // 마지막 페이지는 데이터가 5개보다 부족할 수도 있다.
      setData(Donation.donationLists.slice(5 * (page - 1)));
    } else {
      setData(Donation.donationLists.slice(5 * (page - 1), 5 * (page - 1) + 5));
    }
  }, [page]);

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack alignItems="center">
        <Stack direction="row" justifyContent="center" sx={{ flexWrap: "wrap" }}>
          {data.map((donationList) => {
            return (
              <Stack>
                <hr style={{ width: "100%", marginBottom: 7.5, marginTop: 7.5 }}></hr>
                <div className={props.styles.donationBox}>
                  <div className={props.styles.profileImgName}>
                    <img src={donationList.img} className={props.styles.starImg}></img>
                    <div className={props.styles.starName}>{donationList.name}</div>
                  </div>
                  <div>
                    <div className={props.styles.participateBox}>
                      <div className={props.styles.participateChallenge}>
                        {" "}
                        <span>챌린지 참여</span>
                      </div>
                      {donationList.didDonate === 1 ? (
                        <div className={props.styles.participateDonation}>기부참여</div>
                      ) : null}
                    </div>
                    <div className={props.styles.challengeTitle}>{donationList.title}</div>
                    {donationList.didDonate === 1 ? (
                      <div className={props.styles.donateAmount}>
                        {donationList.donateAmount}원?
                      </div>
                    ) : (
                      <div className={props.styles.donateAmountZero}>쿠쿠루삥뽕</div>
                    )}
                    <div className={props.styles.progressBox}>
                      <ProgressBar styles={props.styles} width={200} percent={0.7}></ProgressBar>
                      {donationList.ing === 1 ? (
                        <div className={props.styles.donateIng}>진행중</div>
                      ) : (
                        <div className={props.styles.donateEnd}> 종료</div>
                      )}
                    </div>
                    <div>
                      <div className={props.styles.infoBot}>
                        <span className={props.styles.donateNumber}>
                          {donationList.donateNum}명
                        </span>
                        <span className={props.styles.donatePercent}>
                          {donationList.donateNum}/{donationList.targetNum}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Stack>
            );
          })}
        </Stack>
        <hr style={{ width: "94%", marginBottom: 7.5, marginTop: 7.5 }}></hr>
        <Pagination
          count={LAST_PAGE}
          defaultPage={1}
          boundaryCount={2}
          size="medium"
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
