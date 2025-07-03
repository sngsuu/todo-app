package com.hwv1.todo.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * 로그인 요청을 처리하기 위한 DTO 클래스입니다.
 */
@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;
}