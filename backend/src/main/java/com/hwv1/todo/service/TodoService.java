package com.hwv1.todo.service;

import com.hwv1.todo.entity.Todo;
import com.hwv1.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * TodoService
 * 비즈니스 로직 계층. 컨트롤러와 레포지토리 사이에서 중간 역할을 합니다.
 */
@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    /**
     * 전체 Todo 목록 조회
     */
    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    /**
     * 새 Todo 저장
     */
    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    /**
     * Todo 업데이트
     * - 기존 항목 조회 후 title, completed 수정
     */
    public Todo update(Long id, Todo updated) {
        Todo todo = todoRepository.findById(id).orElseThrow(); // ID 없을 경우 예외 발생
        todo.setTitle(updated.getTitle());
        todo.setCompleted(updated.isCompleted());
        return todoRepository.save(todo);
    }

    /**
     * Todo 삭제
     */
    public void delete(Long id) {
        todoRepository.deleteById(id);
    }
}