import axios from 'axios'

// ✅ 기본 인스턴스
const api = axios.create({
  baseURL: '/api', // Vite 프록시로 백엔드 연결할 예정
})

// ✅ JWT 토큰 자동 포함
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// ✅ Todo API 정의
export const getTodos = () => api.get<Todo[]>('/todos');
export const createTodo = (data: { title: string }) => api.post<Todo>('/todos', data);
export const updateTodo = (id: number, data: Partial<Todo>) => api.put<Todo>(`/todos/${id}`, data);
export const deleteTodo = (id: number) => api.delete(`/todos/${id}`);