import api from '../axios';

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserSignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface UserUpdateNicknameRequest {
  nickname: string;
}

export async function userLoginApi(body: UserLoginRequest) {
  const res = await api.post('/users/login', body);
  const responseData = res.data;

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  const pickToken = (v: unknown): string | null =>
    typeof v === 'string' && v.trim().length > 0 ? v : null;

  const normalizeToken = (v: string): string => v.replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '').trim();

  // 1) 응답 헤더 Authorization 에 토큰이 내려오는 케이스 지원
  const headerAuth = pickToken((res.headers as Record<string, unknown> | undefined)?.authorization);
  const headerToken = headerAuth ? normalizeToken(headerAuth) : null;

  // 백엔드 응답 필드명이 아직 확정이 아니라서 여러 케이스를 같이 지원합니다.
  // - { success, data: { accessToken } }
  // - { success, data: { access_token } }
  // - { accessToken } / { token } 등
  const accessToken = headerToken ||
    pickToken(responseData?.data?.accessToken) ||
    pickToken(responseData?.data?.access_token) ||
    pickToken(responseData?.data?.token) ||
    pickToken(responseData?.data?.jwt) ||
    pickToken(responseData?.accessToken) ||
    pickToken(responseData?.access_token) ||
    pickToken(responseData?.token) ||
    pickToken(responseData?.jwt);

  if (accessToken) {
    localStorage.setItem('accessToken', normalizeToken(accessToken));
  }

  const refreshToken =
    pickToken(responseData?.data?.refreshToken) ||
    pickToken(responseData?.data?.refresh_token) ||
    pickToken(responseData?.refreshToken) ||
    pickToken(responseData?.refresh_token);

  if (refreshToken) {
    localStorage.setItem('refreshToken', normalizeToken(refreshToken));
  }

  return responseData;
}

export async function userSignupApi(body: UserSignupRequest) {
  const res = await api.post('/users/signup', body);
  return res.data;
}

export async function userLogoutApi() {
  const res = await api.post('/users/me');
  return res.data;
}

export async function userMeApi() {
  const res = await api.get('/users/me');
  return res.data;
}

export async function userUpdateNicknameApi(body: UserUpdateNicknameRequest) {
  const res = await api.patch('/users/me', body);
  return res.data;
}
