package com.ssafy.kirin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "community_comment_like")
public class CommunityCommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne
    @JoinColumn(name = "community_comment_id")
    CommunityComment communityComment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column(name = "user_id")
    long userId;

    @Column(name = "community_comment_id")
    long communityCommentId;
}
