package com.ssafy.kirin.entity;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 생성을 데이터베이스에 위임하는 전략 (MySQL의 AI)
    long id;

    String name;
    String nickname;

    @Column(name = "profile_img")
    String profileImg;

    String email;

    @Column(name = "is_email_verified")
    boolean isEmailVerified;

    String password;

    @Column(name = "wallet_hash")
    String walletHash;

    @Column(name = "account_type")
    String accountType;

    @Column(name = "social_id")
    String socialId;

    @Column(name = "is_celeb")
    boolean isCeleb;

    @OneToOne
    @JoinColumn(name = "celeb_info_id")
    CelebInfo celebInfoId;


    // Security가 관리하는 UserDetails의 methods
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return Long.toString(id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
