package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community,Long> {
    List<Community> findAllByUserId(long userId);
    Community save(Community community);

    Community findById(long id);
}
