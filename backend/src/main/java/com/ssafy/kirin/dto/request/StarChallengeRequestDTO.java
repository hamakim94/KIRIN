package com.ssafy.kirin.dto.request;

import java.time.LocalDateTime;

public record StarChallengeRequestDTO(String title, String info,String musicTitle, LocalDateTime startDate, LocalDateTime endDate,Double length, Integer targetNum, Long targetAmount, Long donationOrganizationId) {
}
