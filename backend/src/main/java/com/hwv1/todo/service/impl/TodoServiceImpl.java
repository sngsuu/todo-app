package com.hwv1.todo.service.impl;

import com.hwv1.todo.dto.TodoRequest;
import com.hwv1.todo.entity.Todo;
import com.hwv1.todo.entity.User;
import com.hwv1.todo.repository.TodoRepository;
import com.hwv1.todo.repository.UserRepository;
import com.hwv1.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

/**
 * TodoServiceImpl
 * - TodoService 인터페이스의 구현체
 * - 비즈니스 로직을 처리하고 Repository와 연결
 */
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    /**
     * 전체 Todo 목록 조회
     */
    @Override
    public List<Todo> findAll() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return todoRepository.findAllByUser_Username(username);
    }

    /**
     * 특정 Todo 조회
     * - ID 없으면 예외 발생
     */
    @Override
    public Todo findById(Long id) {
        // 1. 해당 ID의 Todo를 조회
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("해당 할 일이 존재하지 않습니다"));

        // 2. 현재 로그인한 사용자명 조회
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        // 3. Todo 작성자와 비교 → 다르면 예외
        if (!todo.getUser().getUsername().equals(currentUsername)) {
            throw new AccessDeniedException("해당 할 일에 접근할 수 없습니다");
        }

        return todo;
    }

    /**
     * 새로운 Todo 저장
     */
    @Override
    public Todo save(TodoRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자 없음"));

        Todo todo = Todo.builder()
                .title(request.getTitle())
                .completed(request.isCompleted())
                .user(user)
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
                .orElseThrow(() -> new RuntimeException("할 일 없음"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!todo.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("수정 권한이 없습니다");
        }

        todo.setTitle(request.getTitle());
        todo.setCompleted(request.isCompleted());
        return todoRepository.save(todo);
    }

    /**
     * Todo 삭제
     */
    @Override
    public void delete(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("할 일 없음"));

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!todo.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("삭제 권한이 없습니다");
        }

        todoRepository.deleteById(id);
    }
}