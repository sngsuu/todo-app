import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const AuthRoute = ({ children }: Props) => {
  const { isAuthenticated, checked } = useAuth();

  if (!checked) return <p>⏳ 로그인 상태 확인 중...</p>;
  if (isAuthenticated) return <Navigate to="/todo" replace />;

  return children;
};

export default AuthRoute;