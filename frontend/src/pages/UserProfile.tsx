import { useState } from 'react'
import { updateUser } from '../api/auth'
import toast from 'react-hot-toast'

/**
 * 사용자 이름을 수정할 수 있는 프로필 편집 컴포넌트
 * @param currentUsername 현재 로그인한 유저의 이름 (props로 전달됨)
 */
export default function UserProfile({ currentUsername }: { currentUsername: string }) {
  // 입력창 상태 관리 (초기값은 현재 유저 이름)
  const [username, setUsername] = useState(currentUsername)

  // 저장 버튼 클릭 시 서버에 수정 요청 보내는 함수
  const handleUpdate = async () => {
    try {
      // username만 포함된 객체로 API 호출
      await updateUser({ username })
      toast.success('이름이 성공적으로 변경되었습니다!')
    } catch (error: any) {
      // 에러 발생 시 사용자에게 메시지 출력
      toast.error(`변경 실패: ${error.response?.data?.message || '오류 발생'}`)
    }
  }

  return (
    <div className="space-y-2">
      <label>사용자 이름</label>
      {/* 사용자 이름 입력 필드 */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded px-2 py-1"
      />
      {/* 저장 버튼 */}
      <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded">
        저장
      </button>
    </div>
  )
}