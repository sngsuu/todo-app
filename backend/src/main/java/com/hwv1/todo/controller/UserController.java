package com.hwv1.todo.controller;

import com.hwv1.todo.dto.LoginRequest;
import com.hwv1.todo.dto.SignupRequest;
import com.hwv1.todo.entity.User;
import com.hwv1.todo.jwt.JwtUtil;
import com.hwv1.todo.repository.UserRepository;
import com.hwv1.todo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 회원가입 및 로그인 요청을 처리하는 컨트롤러입니다.
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequest request) {
        userService.signup(request.getUsername(), request.getPassword());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("사용자 없음"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호 오류");
        }

        String token = jwtUtil.createToken(user.getUsername());
        return ResponseEntity.ok(Map.of("token", token));
    }
}