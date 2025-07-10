import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTodos, updateTodo, deleteTodo } from '../api/todoApi'
import toast from 'react-hot-toast'
import TodoForm from '../components/TodoForm'
import Header from '../components/Header'

export default function TodoList() {

  // 기본 데이터 조회
  const queryClient = useQueryClient()
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  const todos = data || []
  const total = todos.length
  const completedCount = todos.filter((todo: any) => todo.completed).length

  // [필터 관련]
  type Filter = 'all' | 'completed' | 'incomplete'
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTodos = todos.filter((todo: any) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'incomplete') return !todo.completed
    return true
  })

  // [이벤트 핸들러]
  const toggleMutation = useMutation({
    mutationFn: (todo: any) =>
      updateTodo(todo.id, { ...todo, completed: !todo.completed }),
    onSuccess: () => {
      toast.success('상태가 변경되었습니다!')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: any) => {
      toast.error(`에러 발생: ${error.response?.data?.message || error.message}`)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      toast.success('삭제 완료!')
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: any) => {
      toast.error(`에러 발생: ${error.response?.data?.message || error.message}`)
    },
  })

  if (isLoading || isFetching) return <p>⏳ 불러오는 중입니다...</p>
  if (isError) return <p>❌ 오류 발생: {(error as Error).message}</p>

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center relative">
      <Header /> {/* ✅ 로그아웃 헤더 컴포넌트 삽입 */}
      <div className="w-full max-w-2xl p-6 bg-white rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 justify-center">
          📋 Todo List
        </h1>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '6px 12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: filter === 'all' ? '#3498db' : '#fff',
              color: filter === 'all' ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            전체
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              padding: '6px 12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: filter === 'completed' ? '#2ecc71' : '#fff',
              color: filter === 'completed' ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            완료
          </button>
          <button
            onClick={() => setFilter('incomplete')}
            style={{
              padding: '6px 12px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: filter === 'incomplete' ? '#e67e22' : '#fff',
              color: filter === 'incomplete' ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            미완료
          </button>
        </div>

        {/* 가운데 정렬된 폼 */}
        <div className="mb-6">
          <TodoForm />
        </div>
        
        {/* 리스트를 한 줄에 카드처럼 배치 */}
        <ul className="flex flex-col gap-3">
          {filteredTodos.map((todo: any) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0.5rem 0',
              color: todo.completed ? '#aaa' : '#000',
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleMutation.mutate(todo)}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                flex: 1,
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              style={{
                color: 'white',
                backgroundColor: '#e74c3c',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
          </li>
        ))}
        </ul>

        {/* ✅ 통계 표시 */}
        <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          총 {total}개 중 {completedCount}개 완료됨 ✅
        </div>
      </div>
    </div>
  )
}