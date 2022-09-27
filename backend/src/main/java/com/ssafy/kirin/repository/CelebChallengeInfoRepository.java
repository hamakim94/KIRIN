package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CelebChallengeInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface CelebChallengeInfoRepository extends JpaRepository<CelebChallengeInfo, Long> {
    CelebChallengeInfo findByChallengeId(Long challengeId);
    List<CelebChallengeInfo> findByEndDateBefore(LocalDateTime localDateTime);
}
