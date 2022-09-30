package com.ssafy.kirin.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record ChallengeDetailDTO(String info, List<DonationDTO> donors, String donationOraganizationName, LocalDateTime startDate, LocalDateTime endDate, Integer targetAmount, Integer targetNum, Integer currentNum, Integer currentAmount) {
}
