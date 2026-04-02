import axios, { type AxiosRequestHeaders } from 'axios';

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

  const rawToken = localStorage.getItem('accessToken');
  if (rawToken) {
    // localStorage에 stringified 된 토큰/따옴표가 섞인 케이스를 방어
    let token = rawToken;
    try {
      if (token.startsWith('"') && token.endsWith('"')) token = JSON.parse(token);
    } catch {
      // JSON.parse 실패해도 token은 그대로 사용
    }
    token = token.replace(/^["']|["']$/g, '').trim();
    // 토큰 값 자체에 'Bearer ' 접두사가 이미 포함된 경우를 방어
    token = token.replace(/^Bearer\s+/i, '').trim();

    if (token) {
      // headers가 undefined일 수 있으니 방어
      if (!config.headers) {
        config.headers = { Authorization: `Bearer ${token}` } as AxiosRequestHeaders;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
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
        // 401은 각 페이지에서 catch 후 처리(예: /login 리다이렉트)하도록 로그만 최소화
        // TODO: 필요시 로컬 스토리지 삭제 및 로그인 페이지로 리다이렉트
        // localStorage.removeItem('accessToken');
        // window.location.href = '/login';
      } else if (status === 403) {
        // 403은 프론트에서 필요한 경우 처리하므로 여기서는 로그만 생략
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
