import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const requestUrl = config.url ?? '';
  const isPublicAuthRequest =
    requestUrl.includes('/users/login') || requestUrl.includes('/users/signup');

  if (isPublicAuthRequest) {
    if (config.headers && 'Authorization' in config.headers) {
      delete config.headers.Authorization;
    }
    return config;
  }

  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    // 정상 응답은 그대로 반환
    return response;
  },
  (error) => {
    // 에러 발생 시 공통 처리 로직
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error('인증 토큰이 만료되었거나 유효하지 않습니다.');
        // TODO: 필요시 로컬 스토리지 삭제 및 로그인 페이지로 리다이렉트
        // localStorage.removeItem('accessToken');
        // window.location.href = '/login';
      } else if (status === 403) {
        console.error('접근 권한이 없습니다.');
      } else if (status >= 500) {
        console.error('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } else {
      console.error('네트워크 연결 에러가 발생했습니다.', error.message);
    }

    // 컴포넌트 단에서도 에러를 캐치할 수 있도록 Promise.reject로 넘김
    return Promise.reject(error);
  }
);

export default api;
