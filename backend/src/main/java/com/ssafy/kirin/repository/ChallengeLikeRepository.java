package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.entity.ChallengeLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeLikeRepository extends JpaRepository<ChallengeLike, Long> {

    List<ChallengeLike> findByUserId(long userId);
}
