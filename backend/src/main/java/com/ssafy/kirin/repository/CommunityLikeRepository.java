package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.Community;
import com.ssafy.kirin.entity.CommunityLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {

    CommunityLike save(CommunityLike communityLike);
    boolean deleteByUserIdAndCommunityId(long userId, long communityId);
}
