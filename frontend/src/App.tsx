// src/App.tsx
import { useAuth } from './hooks/useAuth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TodoList from './pages/TodoList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './components/PrivateRoute';
import { createContext } from 'react';

export const AuthContext = createContext(null);

function App() {
  const { user, checked } = useAuth();

  if (!checked) {
    return <p className="text-center mt-10 text-gray-600">⏳ 인증 상태 확인 중...</p>;
  }

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/todo" /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to="/todo" /> : <SignupPage />} />
          <Route path="/todo" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          <Route path="*" element={<Navigate to={user ? "/todo" : "/login"} />} />
        </Routes>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </AuthContext.Provider>
  );
}

export default App;