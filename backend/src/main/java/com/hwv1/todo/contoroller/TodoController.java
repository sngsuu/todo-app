package com.hwv1.todo.contoroller;

import com.hwv1.todo.entity.Todo;
import com.hwv1.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TodoController
 * REST API 엔드포인트를 정의하는 계층입니다.
 */
@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // CORS 허용 (프론트 연동 시 필수)
public class TodoController {

    private final TodoService todoService;

    /**
     * GET /api/todos
     * 전체 Todo 목록 반환
     */
    @GetMapping
    public List<Todo> findAll() {
        return todoService.findAll();
    }

    /**
     * POST /api/todos
     * 새로운 Todo 등록
     */
    @PostMapping
    public Todo create(@RequestBody Todo todo) {
        return todoService.save(todo);
    }

    /**
     * PUT /api/todos/{id}
     * 기존 Todo 수정
     */
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo) {
        return todoService.update(id, todo);
    }

    /**
     * DELETE /api/todos/{id}
     * Todo 삭제
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        todoService.delete(id);
    }
}