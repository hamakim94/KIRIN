package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.Subscribe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {
    List<Subscribe> findByUserId(long userId);

    Optional<Subscribe> findByUserIdAndCelebId(long userId, long celebId);
}
