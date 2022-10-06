package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.ChallengeContract;
import com.ssafy.kirin.entity.Donation;
import org.springframework.beans.PropertyValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    List<Donation> findByChallenge_challengeId(Long challengeId);
}
