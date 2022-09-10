package com.ssafy.kirin.config.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.security.Key;
import java.security.SignatureException;
import java.util.Date;

@Slf4j
@Component
public class JwtTokenProvider {
    @Value("${jwt.secret}")
    private String JWT_SECRET;
    private Key key;

    private long accessExpirationInMs = 60 * 30 * 1000L;

    private long refreshExpirationInMs = 60 * 60 * 24 * 7 * 1000L;

    private UserDetailsService userDetailsService;

    @Autowired
    public JwtTokenProvider(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PostConstruct
    protected void init() {
        key = Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
    }

    public String createAccessToken(Authentication auth) {
//        Claims claims = Jwts.claims().setSubject(userId);
//        claims.put("userId", userId);

        Date now = new Date();
        Date validity = new Date(now.getTime() + accessExpirationInMs);

        return Jwts.builder()
                .setSubject(auth.getName())
                .setIssuedAt(now) // 발행시간
                .signWith(key, SignatureAlgorithm.HS256) // 암호화
                .setExpiration(validity) // 만료
                .compact();
    }

    public String createRefreshToken(Authentication auth){
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshExpirationInMs);

        String refreshToken = Jwts.builder()
                .setSubject(auth.getName())
                .setIssuedAt(now) // 발행시간
                .signWith(key, SignatureAlgorithm.HS256) // 암호화
                .setExpiration(validity) // 만료
                .compact();

        // redis에 저장

        return refreshToken;
    }

    // Request의 Header에서 token 파싱 : "ACESSTOKEN: jwt토큰"
    public String getTokenFromRequest(HttpServletRequest req, String tokenName) {
        return req.getHeader(tokenName);
    }

    // Jwt 토큰 유효성 검사
    public boolean validateToken(String token) {
        // Redis 사용시 수정해야될듯
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty.: {}", e.getMessage());
        }
        return false;
    }

//    public boolean validateToken(String jwtToken) {
//        try {
//            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken);
//            if (redisService.getValues(jwtToken) != null){
//                System.out.println("만료");
//                return false;
//            }
//            return !claims.getBody().getExpiration().before(new Date());
//        } catch (Exception e) {
//            return false;
//        }
//    }

    // Jwt 토큰에서 회원 구별 정보 추출
    public String getUserPk(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    // Jwt 토큰으로 인증 정보를 조회
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUserPk(token));

        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities()); // 인증용 객체
        //        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // access token의 남은 유효시간 조회
    public Long getExpiration(String accessToken) {
        // accessToken 남은 유효시간
        Date expiration = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody().getExpiration();
        // 현재 시간
        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    // 로그아웃
//    public void logout(String accessToken, String email) {
//        try {
//            Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken);
//            long expiredAccessTokenTime = claims.getBody().getExpiration().getTime() - new Date().getTime();
//            redisService.setValues(accessToken, email, Duration.ofMillis(expiredAccessTokenTime));
//        }
//        catch (Exception e){}
//
//        redisService.deleteValues(email); //
//    }
}
