package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.ChallengeLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeLikeRepository extends JpaRepository<ChallengeLike, Long> {
    List<ChallengeLike> findByUserId(long userId);
}
