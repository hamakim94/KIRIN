package com.ssafy.kirin.config.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter { // 요청당 한 번의 filter 수행
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        1) HttpServletRequest request에서 Header(jwtToken)를 획득한다.
//        2) Header에 JwtToken이 null이 아니면, JwtToken을 복호화하여 안에 정보를 획득한다.
//        3) 만료 시간(expiredAt)과 현재 시간을 비교하여 RefreshToken을 생성할지 고려한다. -> 여기서 안함. 처음에는 access token만 보내주고 실패하면 refresh랑 같이 보내줌.
//        4) JwtToken안에 있는 payload 즉, Claims를 꺼내고 권한정보까지 만들어 인증처리된 Authentication을 생성한다.
//        5) 생성한 Authentication을 SecurityContextHolder에 저장한다.
//        6) 스프링의 나머지 FilterChain들을 수행할 수 있도록 doFilter(request,response)를 호출한다.

        String accessToken = jwtTokenProvider.getTokenFromRequest(request, "ACCESSTOKEN"); // request header에서 access token을 획득
        if (accessToken != null && jwtTokenProvider.validateToken(accessToken)) { // access token이 존재하고 유효하면
            Authentication authentication = jwtTokenProvider.getAuthentication(accessToken); // 인증처리된 Authentication을 생성
            SecurityContextHolder.getContext().setAuthentication(authentication); // 생성한 Authentication을 SecurityContextHolder에 저장
        }
//        else {
//            log.info("no valid JWT token found, uri: {}", request.getRequestURI());
//        }

        filterChain.doFilter(request, response); // 스프링의 나머지 FilterChain들을 수행
    }
}
