package com.hwv1.todo.service;

/**
 * 사용자 서비스 인터페이스입니다.
 * 회원가입 관련 메서드를 정의합니다.
 */
public interface UserService {
    void signup(String username, String password);
}