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
@Table(name = "community_comment")
public class CommunityComment {
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
    @JoinColumn(name = "community_id")
    Community community;

    @Formula("(SELECT COUNT(*) FROM community_comment c WHERE c.community_id = id)")
    int reCommentCnt;

    @Formula("(SELECT COUNT(*) FROM community_comment_like l WHERE l.community_comment_id = id)")
    int commentLikeCnt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

}
