package com.ssafy.kirin.entity;

import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "challenge")
public class Challenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String title;
    String video;
    String thumbnail;
    LocalDateTime reg;

    @Column(name = "is_original")
    Boolean isOriginal;

    @Column(name = "challenge_id")
    Long challengeId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column(name = "view_cnt")
    Integer viewCnt;

    @Column(name = "is_dummy")
    boolean isDummy;

    @OneToOne
    @JoinColumn(name = "celeb_challenge_info_id")
    CelebChallengeInfo celebChallengeInfo;
}
