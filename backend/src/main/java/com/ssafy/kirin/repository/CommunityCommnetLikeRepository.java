package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CommunityCommentLike;
import com.ssafy.kirin.entity.CommunityLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
public interface CommunityCommnetLikeRepository extends JpaRepository<CommunityCommentLike, Long> {
    CommunityCommentLike save(CommunityCommentLike communityCommentLike);
    @Transactional
    void deleteByUserIdAndCommunityCommentId(long userId, long boardId);

    List<CommunityCommentLike> findByUserId(Long userId);
}
