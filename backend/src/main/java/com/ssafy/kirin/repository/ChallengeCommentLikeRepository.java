package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.ChallengeCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeCommentLikeRepository extends JpaRepository<ChallengeCommentLike, Long> {
    void deleteByUserIdAndChallengeCommentId(Long userId, Long challengeCommentId);
    List<ChallengeCommentLike> findByUserId(Long id);
}
