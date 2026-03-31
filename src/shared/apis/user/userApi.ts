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
  return res.data;
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
