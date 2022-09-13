package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CommunityCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface CommunityCommnetLikeRepository extends JpaRepository<CommunityCommentLike, Long> {

    CommunityCommentLike save(CommunityCommentLike communityCommentLike);
    @Transactional
    void deleteByUserIdAndCommunityCommentId(long userId, long boardId);
}
