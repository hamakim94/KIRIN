package com.ssafy.kirin.config.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;

    private static final String[] PUBLIC_API_URI = {
            "/api/users/signup", "/api/users/login", "/api/users/reissue", "/api/users/duplications/check"
    };

    private static final String[] PUBLIC_WEB_URI = {
            "/swagger-ui/**", "/swagger-resources/**",
            "/swagger-ui.html", "/webjars/**", "/swagger/**", "/v2/api-docs"
//            "/js/**","/css/**","/images/**","/font/**","/html/**"
    };

    // custom 인증 매커니즘 구성
    // spring security 설정
    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and().csrf().disable()// rest api 서버용으로만 사용할 것이므로
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)// JWT를 쓰기 위해 Spring Security에서 기본적으로 지원하는 Session 설정을 해제
                .and().authorizeRequests()
                .antMatchers(PUBLIC_API_URI).permitAll() // 이 api들은 인증 필요 없음.
//                .antMatchers("/star/**").hasRole("STAR")
                .anyRequest().authenticated() // 그 외에는 전부 인증 필요함.
                .and().addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class); // UsernamePasswordAuthenticationFilter보다 먼저 실행된다

        return http.build();
    }

    // spring security 앞단 설정
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(PUBLIC_WEB_URI);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
