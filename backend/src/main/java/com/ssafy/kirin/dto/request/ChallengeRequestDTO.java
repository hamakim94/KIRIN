package com.ssafy.kirin.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record ChallengeRequestDTO(String title, MultipartFile video, boolean isOriginal, Long challengeId) {
}
