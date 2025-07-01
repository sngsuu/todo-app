package com.hwv1.todo.dto;

import com.hwv1.todo.entity.Todo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Schema(description = "Todo 응답 DTO")
public class TodoResponse {

    @Schema(description = "할 일 ID", example = "1")
    private Long id;

    @Schema(description = "할 일 제목", example = "자바 공부하기")
    private String title;

    @Schema(description = "완료 여부", example = "false")
    private boolean completed;

    public TodoResponse(Todo entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.completed = entity.isCompleted();
    }

    // Getter만 제공 (읽기 전용)
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return completed;
    }
}