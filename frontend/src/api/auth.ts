// src/api/auth.ts
// 사용자 인증 관련 API 정의 (로그인, 회원가입, 사용자 정보 조회 등)

import axiosInstance from './axiosInstance'

// 로그인 요청: 서버에서 HttpOnly 쿠키에 토큰 저장
export const login = async (credentials: { username: string; password: string }) => {
  const res = await axiosInstance.post('/users/login', credentials)
  return res.data
}

// 회원가입 요청
export const signup = async (data: { username: string; password: string }) => {
  const res = await axiosInstance.post('/users/signup', data)
  return res.data
}

// 현재 로그인한 사용자 정보 조회 (쿠키 기반 인증)
export const getCurrentUser = async () => {
  const res = await axiosInstance.get('/users/me')
  return res.data
}

// 로그아웃 요청: 서버가 쿠키 제거
export const logout = async () => {
  try {
    await axiosInstance.post('/users/logout')
  } catch (e) {
    console.warn('서버 로그아웃 실패')
  }
}

/**
 * 사용자 정보 수정 (이름, 비밀번호 중 일부 변경 가능)
 * @param data username 또는 password 중 필요한 값 전달
 */
export async function updateUser(data: { username?: string; password?: string }) {
  const response = await axiosInstance.put('/users/me', data)
  return response.data
}