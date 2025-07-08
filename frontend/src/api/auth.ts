// src/api/auth.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Vite 프록시 기반
});

// 로그인 응답 타입
interface LoginResponse {
  token: string;
}

// 회원가입 요청
export const signup = (username: string, password: string) =>
  api.post('/users/signup', { username, password });

// 로그인 요청 → 토큰 저장
export const login = async (username: string, password: string): Promise<string> => {
  const res = await api.post<LoginResponse>('/users/login', { username, password });
  const token = res.data.token;
  localStorage.setItem('token', token); // ✅ 토큰 저장
  return token;
};

// 토큰 제거
export const logout = () => {
  localStorage.removeItem('token');
};