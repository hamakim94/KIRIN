package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.ChallengeComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeCommentRepository extends JpaRepository<ChallengeComment, Long> {
    List<ChallengeComment> findByChallengeId(Long challengeId);
    List<ChallengeComment> findByParentId(Long parentId);
}
