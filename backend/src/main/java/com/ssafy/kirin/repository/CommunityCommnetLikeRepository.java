package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CommunityCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityCommnetLikeRepository extends JpaRepository<CommunityCommentLike, Long> {

    CommunityCommentLike save(CommunityCommentLike communityCommentLike);
    boolean deleteByUserIdAndCommunityCommentId(long userId, long boardId);
}
