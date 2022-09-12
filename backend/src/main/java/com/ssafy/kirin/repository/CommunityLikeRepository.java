package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.Community;
import com.ssafy.kirin.entity.CommunityLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {

    CommunityLike save(CommunityLike communityLike);
    @Transactional
    void deleteByUserIdAndCommunityId(long userId, long communityId);
}
