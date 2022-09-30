package com.ssafy.kirin.dto.response;

import java.time.LocalDateTime;

public class CelebChallengeDTO {
    Long id;
    String title;
    String video;
    String thumbnail;
    LocalDateTime reg;
    UserResponseDTO user;
    Long challengeId;
    Integer likeCnt;
    Integer commentCnt;
    Integer viewCnt;
    Boolean isProceeding;
    LocalDateTime startDate;
    LocalDateTime endDate;
    Integer targetNum;
    Integer targetAmount;
    Integer currentNum;
    Integer currentAmount;
    Boolean liked;

}
