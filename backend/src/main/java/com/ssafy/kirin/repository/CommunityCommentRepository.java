package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {

    CommunityComment save(CommunityComment communityComment);
    List<CommunityComment> findByCommunityId(long boardId);

}
