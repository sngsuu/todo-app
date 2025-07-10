// todoApi.ts
// 할 일(Todo) 관련 API 정의 (조회, 생성, 수정, 삭제)

import axiosInstance from './axiosInstance';

// 공통 axios 인스턴스를 'api'로 사용
const api = axiosInstance;

// Todo 데이터 타입 정의
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// 전체 Todo 목록 조회
export const getTodos = async () => {
  const res = await api.get<Todo[]>('/todos');
  return res.data;
};

// 새로운 Todo 항목 생성
export const createTodo = async (data: { title: string }) => {
  const res = await api.post<Todo>('/todos', data);
  return res.data;
};

// 특정 Todo 항목 수정 (완료 여부 등)
export const updateTodo = async (id: number, data: Partial<Todo>) => {
  const res = await api.put<Todo>(`/todos/${id}`, data);
  return res.data;
};

// 특정 Todo 항목 삭제
export const deleteTodo = async (id: number) => {
  const res = await api.delete(`/todos/${id}`);
  return res.data;
};