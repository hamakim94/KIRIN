package com.ssafy.kirin.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@DynamicInsert
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본키 생성을 데이터베이스에 위임하는 전략 (MySQL의 AI)
    long id;

    String name;
    String nickname;

    @Column(name = "profile_img")
    String profileImg;

    String email;

    @Column(name = "is_email_verified")
    Boolean isEmailVerified;

    String password;

    @Column(name = "wallet_id")
    Long walletId;

//    @Column(name = "account_type")
//    Integer accountType;
//
//    @Column(name = "social_id")
//    String socialId;

    @Column(name = "is_celeb")
    Boolean isCeleb;

    LocalDateTime reg;

    @OneToOne
    @JoinColumn(name = "celeb_info_id")
    CelebInfo celebInfo;

    @Column(name = "is_celeb_verified")
    Boolean isCelebVerified;

    public void setCelebInfo(CelebInfo celebInfo) {
        this.celebInfo = celebInfo;
    }

    public void setProfileImgAndNickname(String profileImg, String nickname){
        this.profileImg = profileImg;
        this.nickname = nickname;
    }

    public void emailVerifiedSuccess() {
        this.isEmailVerified = true;
    }
}
