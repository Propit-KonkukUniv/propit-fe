import api from './axios';

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export async function loginApi(body: LoginRequest) {
  const res = await api.post('/users/login', body);
  return res.data;
}

export async function signupApi(body: SignupRequest) {
  const res = await api.post('/users/signup', body);
  return res.data;
}
