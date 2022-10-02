package com.ssafy.kirin.entity;

import lombok.*;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
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
    Long challengeId; // 본챌린지id

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Formula("(SELECT COUNT(*) FROM challenge_like l WHERE l.challenge_id = id)")
    Integer likeCnt;

    @Formula("(SELECT COUNT(*) FROM challenge_comment c WHERE c.challenge_id = id)")
    Integer commentCnt;

    @Formula("(SELECT COUNT(*)-1 FROM challenge c WHERE c.challenge_id = challenge_id)")
    Integer participants;

    @Column(name = "view_cnt")
    Integer viewCnt;

    @Column(name = "is_proceeding")
    Boolean isProceeding;
}
