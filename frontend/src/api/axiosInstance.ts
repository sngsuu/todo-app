// src/api/axiosInstance.ts
import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      // ✅ 로그인, 회원가입 페이지에서는 리다이렉트 하지 않음
      if (!['/login', '/signup', '/'].includes(currentPath)) {
        toast.error('세션이 만료되었습니다');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;