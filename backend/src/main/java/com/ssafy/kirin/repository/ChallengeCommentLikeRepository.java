package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.ChallengeCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeCommentLikeRepository extends JpaRepository<ChallengeCommentLike, Long> {
}
