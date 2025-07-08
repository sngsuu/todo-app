package com.hwv1.todo.repository;

import com.hwv1.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Todo JPA Repository
 * 기본적인 CRUD 메서드가 자동으로 구현되어 있습니다.
 */
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // findAll, findById, save, delete 등 기본 메서드 자동 제공
    List<Todo> findAllByUser_Username(String username);
}