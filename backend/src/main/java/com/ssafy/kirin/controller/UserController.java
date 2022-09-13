package com.ssafy.kirin.controller;


import com.ssafy.kirin.config.security.JwtTokenProvider;
import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.LoginRequestDTO;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO loginRequestDTO){
        log.info("login 함수 실행");
        UserDTO userDTO = userService.login(loginRequestDTO, passwordEncoder);

        if (userDTO != null) {
            Authentication auth = new UsernamePasswordAuthenticationToken(userDTO.getId(), loginRequestDTO.getPassword());
            String accessToken = jwtTokenProvider.createAccessToken(auth); // access token 발급
            String refreshToken = jwtTokenProvider.createRefreshToken(auth); // refresh token 발급

            return ResponseEntity.ok().header("ACCESSTOKEN", accessToken).header("REFRESHTOKEN", refreshToken).body(userDTO);
        }

        return new ResponseEntity<>("invalid ID", HttpStatus.UNAUTHORIZED);
    }

    // test용
//    @GetMapping("/logout")
//    public ResponseEntity logout(HttpServletRequest request){
//        String accessToken = jwtTokenProvider.getTokenFromRequest(request, "ACCESSTOKEN");
//        Authentication auth = jwtTokenProvider.getAuthentication(accessToken);
//
//        // Redis에 해당 user id로 저장된 refresh token이 있을 경우 삭제
//        if (redisTemplate.opsForValue().get(auth.getName()) != null) {
//            redisTemplate.delete(auth.getName());
//        }
//
//        // 해당 access token의 유효시간 가지고 와서 logout된 access token 저장
//        Long expiration = jwtTokenProvider.getExpiration(accessToken);
//        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);
//
//        return ResponseEntity.ok().build();
//    }

    @GetMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request, @AuthenticationPrincipal UserDTO userDTO){
        // Redis에 해당 user id로 저장된 refresh token이 있을 경우 삭제
        if (redisTemplate.opsForValue().get(userDTO.getId()) != null) {
            redisTemplate.delete(userDTO.getId());
        }

        String accessToken = jwtTokenProvider.getTokenFromRequest(request, "ACCESSTOKEN");

        // 해당 access token의 유효시간 가지고 와서 logout된 access token 저장
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request, HttpServletResponse response) {
        String accessToken = jwtTokenProvider.getTokenFromRequest(request, "ACCESSTOKEN");
        String refreshToken = jwtTokenProvider.getTokenFromRequest(request, "REFRESHTOKEN");
        String userId = jwtTokenProvider.getUserPk(accessToken);

        if(refreshToken.equals(redisTemplate.opsForValue().get(userId)) && jwtTokenProvider.validateToken(refreshToken)){ // refresh token이 유효하면
            Authentication auth = jwtTokenProvider.getAuthentication(accessToken);
            accessToken = jwtTokenProvider.createAccessToken(auth); // accessToken 재발급
            response.setHeader("ACCESSTOKEN", accessToken);
            auth = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(auth); // authentication 재저장

            log.info("token 재발급 성공");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        log.error("token 재발급 실패");
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
