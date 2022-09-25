package com.ssafy.kirin.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "is_read")
    Boolean isRead;

    @Column(name = "user_id")
    Long userId;

    @Column(name = "event")
    String event;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    Challenge challenge;

    @ManyToOne
    @JoinColumn(name = "challenge_comment_id")
    ChallengeComment challengeComment;

    @ManyToOne
    @JoinColumn(name = "community_id")
    Community community;

    @ManyToOne
    @JoinColumn(name = "community_comment_id")
    CommunityComment communityComment;
}
