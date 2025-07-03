package com.hwv1.todo.controller;

import com.hwv1.todo.dto.TodoRequest;
import com.hwv1.todo.dto.TodoResponse;
import com.hwv1.todo.entity.Todo;
import com.hwv1.todo.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
@Tag(name = "Todo API", description = "할 일 목록 API입니다")
public class TodoController {

    private final TodoService todoService;

    /**
     * GET /api/todos
     * 전체 Todo 목록 반환
     */
    @Operation(summary = "전체 Todo 조회", description = "모든 할 일 데이터를 반환합니다")
    @GetMapping
    public List<Todo> findAll() {
        return todoService.findAll();
    }

    /**
     * GET /api/todos/{id}
     * 특정 Todo 단건 조회
     */
    @Operation(summary = "Todo 단건 조회", description = "ID에 해당하는 할 일 데이터를 반환합니다")
    @GetMapping("/{id}")
    public TodoResponse findById(@PathVariable Long id) {
        Todo todo = todoService.findById(id);
        return new TodoResponse(todo);
    }

    /**
     * POST /api/todos
     * 새로운 Todo 등록
     */
    @Operation(summary = "Todo 생성", description = "새로운 할 일을 등록합니다")
    @PostMapping
    public TodoResponse create(@Valid @RequestBody TodoRequest request) {
        Todo todo = todoService.save(request);
        return new TodoResponse(todo);
    }

    /**
     * PUT /api/todos/{id}
     * 기존 Todo 수정
     */
    @Operation(summary = "Todo 수정", description = "기존 할 일을 수정합니다")
    @PutMapping("/{id}")
    public TodoResponse update(@PathVariable Long id, @Valid @RequestBody TodoRequest request) {
        Todo todo = todoService.update(id, request);
        return new TodoResponse(todo);
    }

    /**
     * DELETE /api/todos/{id}
     * Todo 삭제
     */
    @Operation(summary = "Todo 삭제", description = "할 일을 삭제합니다")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        todoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}