package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CommunityLike;
import org.springframework.beans.PropertyValues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {
    CommunityLike save(CommunityLike communityLike);
    @Transactional
    void deleteByUserIdAndCommunityId(long userId, long communityId);
    List<CommunityLike> findByUserId(Long id);
    Boolean existsByUserIdAndCommunityId(Long userId, Long communityId);
}
