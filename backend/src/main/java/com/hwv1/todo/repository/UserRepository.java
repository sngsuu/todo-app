package com.hwv1.todo.repository;

import com.hwv1.todo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 사용자 엔티티에 대한 DB 접근을 위한 JPA 리포지토리입니다.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}