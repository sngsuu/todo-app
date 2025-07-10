// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api/auth';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [checked, setChecked] = useState(false); // 인증 여부 확인 완료 여부

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (e) {
        setUser(null);
      } finally {
        setChecked(true);
      }
    };

    fetchUser();
  }, []);

  return {
    user,
    isAuthenticated: !!user,
    checked, // 인증 확인이 끝났는지 여부
  };
};