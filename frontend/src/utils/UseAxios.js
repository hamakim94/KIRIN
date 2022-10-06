import axios from 'axios';
import { Cookies } from 'react-cookie';
import swal2 from 'sweetalert2';

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
    const {
      config,
      response: { status },
    } = error;
    try {
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
      if (err.response.status === 400) {
        cookies.remove('accesstoken', { path: '/' });
        cookies.remove('refreshtoken', { path: '/' });
        swal2
          .fire({
            title: '세션이 만료되었습니다. 다시 로그인해주세요.',
            confirmButtonColor: '#ffc947',
            confirmButtonText: '확인',
          })
          .then((result) => {
            if (result.isConfirmed) window.location.href = '/login';
          });
      }
    }
    return Promise.reject(error);
  }
);

export default UseAxios;
