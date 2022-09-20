import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default UseAxios = axios.create({
  baseURL: "{API주소}",
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
        `API주소/api/users/reissue`, // token refresh api
        {},
        {
          headers: { ACCESSTOKEN: accesstoken, REFRESHTOKEN: refreshtoken },
        }
      );
      if (response.headers.accesstoken) {
        // axios에서 쿠키 설정 부분
        cookies.set("accesstoken", response.headers.accesstoken, {
          sameSite: "strict",
          path: "/",
          expires: new Date(new Date().getDate + 30),
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
