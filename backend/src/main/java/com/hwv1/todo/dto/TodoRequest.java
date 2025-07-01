package com.hwv1.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Schema(description = "Todo 등록 요청 DTO")
public class TodoRequest {

    @NotBlank(message = "할 일 제목은 비어 있을 수 없습니다.")
    @Schema(description = "할 일 제목", example = "자바 공부하기")
    private String title;

    @Schema(description = "완료 여부", example = "false")
    private boolean completed;

    // Getter/Setter
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}