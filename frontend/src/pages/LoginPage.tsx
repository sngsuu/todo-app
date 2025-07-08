import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../api/auth';

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
        await login(username, password);
        toast.success('로그인 성공!');
        navigate('/todo');
    } catch (e) {
        toast.error('로그인 실패');
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
      {/* ✅ 회원가입 페이지로 이동 버튼 */}
      <p style={{ marginTop: '1rem' }}>
        계정이 없으신가요?{' '}
        <button
          onClick={() => navigate('/signup')}
          style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          회원가입
        </button>
      </p>
    </div>
  );
}

export default LoginPage;