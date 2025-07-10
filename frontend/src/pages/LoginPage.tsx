import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checked } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });

  useEffect(() => {
    if (checked && isAuthenticated) {
      navigate('/todo');
    }
  }, [checked, isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      toast.success('로그인 성공!');
      navigate('/todo');
    } catch (error: any) {
      toast.error(error.response?.data?.message || '로그인 실패');
    }
  };

  if (!checked) {
    return <p className="text-center mt-10 text-gray-500">⏳ 로그인 상태 확인 중...</p>;
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">로그인</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          type="text"
          placeholder="아이디"
          value={form.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          로그인
        </button>
      </form>

      {/* ✅ 회원가입 링크 */}
      <p className="mt-4 text-center text-sm text-gray-600">
        계정이 없으신가요?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;