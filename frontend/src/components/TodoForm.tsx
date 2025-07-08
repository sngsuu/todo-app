import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo } from '../api/todoApi'
import toast from 'react-hot-toast'

export default function TodoForm() {
  const [title, setTitle] = useState('') // 입력 상태 관리
  const queryClient = useQueryClient()   // 캐시 갱신용

  const mutation = useMutation({
    mutationFn: () => createTodo({ title }),
    onSuccess: () => {
      toast.success("✅ 할 일이 등록되었습니다!")
      queryClient.invalidateQueries({ queryKey: ['todos'] }) // 목록 새로고침
      setTitle('') // 입력창 초기화
    },
    onError: (error: any) => {
      toast.error(`에러 발생: ${error.response?.data?.message || error.message}`)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('할 일을 입력해주세요!')
      return
    }
    mutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? '등록 중...' : '추가'}
      </button>
    </form>
  )
}