package com.ssafy.kirin.entity;

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
    long id;

    String title;
    String video;
    String thumbnail;
    LocalDateTime reg;

    @Column(name = "is_original")
    boolean isOriginal;

    @Column(name = "challenge_id")
    long challengeId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column(name = "view_cnt")
    int viewCnt;

    @Column(name = "is_dummy")
    boolean isDummy;

    @OneToOne
    @JoinColumn(name = "celeb_challenge_info_id")
    CelebChallengeInfo celebChallengeInfo;
}
