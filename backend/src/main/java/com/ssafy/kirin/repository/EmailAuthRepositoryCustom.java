package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.EmailAuth;

import java.time.LocalDateTime;
import java.util.Optional;

public interface EmailAuthRepositoryCustom {
    Optional<EmailAuth> findValidAuthByEmail(String email, String authToken, LocalDateTime currentTime);
}
