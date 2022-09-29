package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.ChallengeContract;
import com.ssafy.kirin.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
}
