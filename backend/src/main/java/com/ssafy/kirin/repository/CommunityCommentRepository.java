package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.CommunityComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {
    CommunityComment save(CommunityComment communityComment);
    List<CommunityComment> findByCommunityId(long boardId);

}
