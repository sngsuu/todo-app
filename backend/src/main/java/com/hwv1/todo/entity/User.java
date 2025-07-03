package com.hwv1.todo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * 사용자 정보를 나타내는 JPA 엔티티 클래스입니다.
 */
@Entity
@Table(name = "users")  // ← 예약어 충돌 방지
@Getter
@Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; // 사용자 ID

    @Column(nullable = false)
    private String password; // 암호화된 비밀번호
}