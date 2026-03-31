import api from './axios';

export type LoginRequest = {
  nickname: string;
  password: string;
};

export type SignupRequest = {
  nickname: string;
  password: string;
};

export async function loginApi(body: LoginRequest) {
  const res = await api.post('/users/login', body);
  return res.data;
}

export async function signupApi(body: SignupRequest) {
  const res = await api.post('/users/signup', body);
  return res.data;
}
