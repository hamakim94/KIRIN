package com.ssafy.kirin.repository;

import com.ssafy.kirin.dto.response.MyChallengeResponseDTO;

import java.util.List;

public interface ChallengeRepositoryCustom {
    List<MyChallengeResponseDTO> findMyChallengesByUserId(long userId);
}
