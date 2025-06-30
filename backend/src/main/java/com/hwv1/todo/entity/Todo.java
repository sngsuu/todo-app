package com.hwv1.todo.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Todo 엔티티 클래스.
 * DB의 todo 테이블과 매핑되며, JPA가 관리하는 객체입니다.
 */
@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 자동 생성 (auto-increment)
    private Long id;

    private String title;     // 할 일 제목
    private boolean completed; // 완료 여부
}