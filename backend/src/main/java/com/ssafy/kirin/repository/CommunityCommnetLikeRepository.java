package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CommunityCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CommunityCommnetLikeRepository extends JpaRepository<CommunityCommentLike, Long> {
    CommunityCommentLike save(CommunityCommentLike communityCommentLike);
    @Transactional
    void deleteByUserIdAndCommunityCommentId(long userId, long boardId);
}
