import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../api/auth';
import toast from 'react-hot-toast';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('로그아웃 되었습니다');
      navigate('/login');
    } catch (e) {
      toast.error('로그아웃 실패');
    }
  };

  return (
    <header className="bg-gray-100 px-4 py-2 shadow flex justify-between items-center">
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-600">👤 {user.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            로그아웃
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;