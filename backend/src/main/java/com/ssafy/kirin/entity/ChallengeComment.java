package com.ssafy.kirin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "challenge_comment")
public class ChallengeComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String content;
    LocalDateTime reg;

    @Column(name = "is_comment")
    boolean isComment;

    @Column(name = "parent_id")
    long parentId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    Challenge challenge;

    @Formula("(SELECT COUNT(*) FROM challenge_comment_like l WHERE l.challenge_comment_id = id")
    int likeCnt;
}
