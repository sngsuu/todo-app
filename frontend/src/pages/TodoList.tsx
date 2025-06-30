import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../api/todoApi'

export default function TodoList() {
  const { data } = useQuery({ queryKey: ['todos'], queryFn: getTodos })

  return (
    <div>
      <h1>📋 Todo List</h1>
      <ul>
        {data?.data.map((todo: any) => (
          <li key={todo.id}>
            <span>{todo.title}</span> - <b>{todo.completed ? '✅' : '❌'}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}