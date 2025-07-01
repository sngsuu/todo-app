package com.hwv1.todo.service.impl;

import com.hwv1.todo.dto.TodoRequest;
import com.hwv1.todo.entity.Todo;
import com.hwv1.todo.repository.TodoRepository;
import com.hwv1.todo.service.TodoService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * TodoServiceImpl
 * - TodoService 인터페이스의 구현체
 * - 비즈니스 로직을 처리하고 Repository와 연결
 */
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    /**
     * 전체 Todo 목록 조회
     */
    @Override
    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    /**
     * 특정 Todo 조회
     * - ID 없으면 예외 발생
     */
    @Override
    public Todo findById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 ID의 Todo가 존재하지 않습니다: " + id));
    }

    /**
     * 새로운 Todo 저장
     */
    @Override
    public Todo save(TodoRequest request) {
        Todo todo = Todo.builder()
                .title(request.getTitle())
                .completed(request.isCompleted())
                .build();
        return todoRepository.save(todo);
    }

    /**
     * Todo 업데이트
     * - 기존 Todo를 조회 후 필드 수정
     */
    @Override
    public Todo update(Long id, TodoRequest request) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("해당 ID의 Todo가 존재하지 않습니다: " + id));
        todo.setTitle(request.getTitle());
        todo.setCompleted(request.isCompleted());
        return todoRepository.save(todo);
    }

    /**
     * Todo 삭제
     */
    @Override
    public void delete(Long id) {
        todoRepository.deleteById(id);
    }
}