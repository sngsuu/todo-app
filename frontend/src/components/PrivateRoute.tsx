import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated, checked } = useAuth();

  if (!checked) return <p>⏳ 로그인 상태 확인 중...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;