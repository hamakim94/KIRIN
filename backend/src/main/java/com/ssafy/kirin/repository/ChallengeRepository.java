package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.Challenge;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    List<Challenge> findAll();
    List<Challenge> findByIsOriginalAndIsProceeding(boolean isOriginal, boolean isProceeding);
    List<Challenge> findByIsOriginalAndIsProceeding(boolean isOriginal, boolean isProceeding, Sort sort);
    List<Challenge> findByChallengeId(long challengeId);
    List<Challenge> findByUserId(long userId);

}
