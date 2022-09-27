import axios from 'axios';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const UseAxios = axios.create({
  baseURL: `/api`,
});

UseAxios.interceptors.request.use(
  async (config) => {
    const accesstoken = cookies.get('accesstoken');
    const refreshtoken = cookies.get('refreshtoken');
    if (accesstoken && refreshtoken) {
      config.headers['ACCESSTOKEN'] = accesstoken;
      config.headers['REFRESHTOKEN'] = refreshtoken;
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
    try {
      const {
        config,
        response: { status },
      } = error;
      if (status === 403) {
        const exDate = new Date();
        exDate.setDate(exDate.getDate() + 60);
        const originalRequest = config;
        const accesstoken = cookies.get('accesstoken');
        const refreshtoken = cookies.get('refreshtoken');
        // token refresh 요청
        const response = await axios.post(
          `/api/users/reissue`, // token refresh api
          {},
          {
            headers: { ACCESSTOKEN: accesstoken, REFRESHTOKEN: refreshtoken },
          }
        );
        if (response.headers.accesstoken) {
          // axios에서 쿠키 설정 부분
          cookies.set('accesstoken', response.headers.accesstoken, {
            path: '/',
            secure: true,
            sameSite: 'none',
            expires: exDate,
          });
          originalRequest.headers['ACCESSTOKEN'] = response.headers.accesstoken;
          return axios(originalRequest);
        }
      }
    } catch (err) {
      cookies.remove('accesstoken', { path: '/' });
      cookies.remove('refreshtoken', { path: '/' });
      alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default UseAxios;
