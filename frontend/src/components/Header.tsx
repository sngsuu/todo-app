// src/components/Header.tsx

import { useNavigate } from 'react-router-dom'
import { logout } from '../api/auth'
import toast from 'react-hot-toast'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('로그아웃 되었습니다')
    navigate('/login')
  }

  return (
    <header className="absolute top-4 right-6">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        로그아웃
      </button>
    </header>
  )
}

export default Header