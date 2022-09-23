package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CelebChallengeInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CelebChallengeInfoRepository extends JpaRepository<CelebChallengeInfo, Long> {
    CelebChallengeInfo findByChallengeId(Long challengeId);
}
