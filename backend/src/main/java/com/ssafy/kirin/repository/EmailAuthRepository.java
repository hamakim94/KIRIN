package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailAuthRepository  extends JpaRepository<EmailAuth, Long> {
    Optional<EmailAuth> findByEmailAndAuthToken(String email, String authToken);
}
