package com.ssafy.kirin.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MyChallengeResponseDTO {
    Long id; // 내가 올린 챌린지 id
    String title; // 연예인이 올린 챌린지명
    Long starId;
    String starName;
    String starProfile;
    Long starChallengeId; // 스타가 올린 챌린지 id
    Boolean isProceeding;
    Integer targetNum; // 해당 챌린지의 목표 인원수
    Long targetAmount; // 해당 챌린지의 목표 금액
    Integer currentNum; // 현재 챌린지에 참여한 인원수
    Long currentAmount; // 현재 챌린지에 모금된 금액 (donation)
    Long donationOrganizationId;
    String donationOrganizationName;
    Long myDonation; // 내가 기부한 금액(토큰)
}
