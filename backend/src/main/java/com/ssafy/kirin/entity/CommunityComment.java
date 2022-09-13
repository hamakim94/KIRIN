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
@Table(name = "community_comment")
public class CommunityComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String content;
    LocalDateTime reg;

    @Column(name = "is_comment")
    boolean isComment;

    @Column(name = "parent_id")
    Long parentId;

    @Column(name = "community_id")
    long communityId;

    @Formula("(SELECT COUNT(*) FROM community_comment c WHERE c.community_id = id)")
    int reCommentCnt;

    @Formula("(SELECT COUNT(*) FROM community_comment_like l WHERE l.community_comment_id = id)")
    int commentLikeCnt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

}
