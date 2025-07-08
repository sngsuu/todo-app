import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import TodoList from './pages/TodoList';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const isLoggedIn = !!localStorage.getItem('token'); // 간단한 로그인 체크

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/todo" : "/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/todo" element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;