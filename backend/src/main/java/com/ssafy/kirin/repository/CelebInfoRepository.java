package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CelebInfo;
import com.ssafy.kirin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CelebInfoRepository extends JpaRepository<CelebInfo, Long> {
    Optional<CelebInfo> findById(CelebInfo celebInfoId);
}
