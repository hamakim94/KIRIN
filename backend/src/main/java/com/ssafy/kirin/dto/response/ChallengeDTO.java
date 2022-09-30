package com.ssafy.kirin.dto.response;

import com.ssafy.kirin.entity.User;
import io.swagger.models.auth.In;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ChallengeDTO {
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
    String donationOrganizationName;
}
