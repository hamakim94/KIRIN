package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CelebChallengeInfo;
import com.ssafy.kirin.entity.ChallengeContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChallengeContractRepository extends JpaRepository<ChallengeContract, Long> {
}
