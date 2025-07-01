package com.hwv1.todo.service;

import com.hwv1.todo.dto.TodoRequest;
import com.hwv1.todo.entity.Todo;

import java.util.List;

/**
 * TodoService
 * - 서비스 인터페이스: 컨트롤러와의 계약 정의
 */
public interface TodoService {

    /**
     * 전체 Todo 목록 조회
     */
    List<Todo> findAll();

    /**
     * 특정 ID의 Todo 조회
     */
    Todo findById(Long id);

    /**
     * 새로운 Todo 저장
     */
    Todo save(TodoRequest request);

    /**
     * 기존 Todo 업데이트
     */
    Todo update(Long id, TodoRequest request);

    /**
     * Todo 삭제
     */
    void delete(Long id);
}