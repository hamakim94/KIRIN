package com.ssafy.kirin.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "email_auth")
public class EmailAuth {
    private static final long MAX_EXPIRE_TIME = 10l;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String email; // 가입 이메일
    @Column(name = "auth_token")
    private String authToken; // UUID
    @Column(name = "is_expired")
    private Boolean isExpired;
    @Column(name = "expire_date")// 만료 여부
    private LocalDateTime expireDate; // 만료 시간 (생성 10분 후)

    @Builder
    public EmailAuth(String email, String authToken, boolean isExpired) {
        this.email = email;
        this.authToken = authToken;
        this.isExpired = isExpired;
        this.expireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
    }

    public void useToken() {
        this.isExpired = true;
    }
}
