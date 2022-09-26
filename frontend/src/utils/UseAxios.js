import axios from "axios";
import { Cookies } from "react-cookie";

const apiadr = process.env.REACT_APP_BASEURL;
const cookies = new Cookies();

const UseAxios = axios.create({
  baseURL: `/api`,
});

UseAxios.interceptors.request.use(
  async (config) => {
    const accesstoken = cookies.get("accesstoken");
    const refreshtoken = cookies.get("refreshtoken");
    if (accesstoken && refreshtoken) {
      config.headers["ACCESSTOKEN"] = accesstoken;
      config.headers["REFRESHTOKEN"] = refreshtoken;
    } else {
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

UseAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 403) {
      const originalRequest = config;
      const accesstoken = cookies.get("accesstoken");
      const refreshtoken = cookies.get("refreshtoken");
      // token refresh 요청
      const response = await axios.post(
        `${apiadr}/api/users/reissue`, // token refresh api
        {},
        {
          headers: { ACCESSTOKEN: accesstoken, REFRESHTOKEN: refreshtoken },
        }
      );
      if (response.headers.accesstoken) {
        // axios에서 쿠키 설정 부분
        const accDate = new Date();
        cookies.set("accesstoken", response.headers.accesstoken, {
          path: "/",
          secure: true,
          sameSite: "none",
          expires: accDate,
        });
        originalRequest.headers["ACCESSTOKEN"] = response.headers.accesstoken;
        return axios(originalRequest);
      } else {
        // 전체 삭제 되는지 확인해야할 부분
        cookies.remove();
      }
    }
    return Promise.reject(error);
  }
);

export default UseAxios;
