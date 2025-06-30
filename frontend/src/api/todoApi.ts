import axios from 'axios'

// ✅ 기본 인스턴스
const api = axios.create({
  baseURL: '/api', // Vite 프록시로 백엔드 연결할 예정
})

// ✅ Todo API 정의
export const getTodos = () => api.get('/todos')
export const createTodo = (data: { title: string }) => api.post('/todos', data)
export const updateTodo = (id: number, data: any) => api.put(`/todos/${id}`, data)
export const deleteTodo = (id: number) => api.delete(`/todos/${id}`)