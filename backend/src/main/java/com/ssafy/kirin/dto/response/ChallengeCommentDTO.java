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
public class ChallengeCommentDTO {
    Long id;
    String content;
    LocalDateTime reg;
    Long parentId;
    Long challengeId;
    Integer reCommentCnt;
    Integer likeCnt;
    UserResponseDTO user;
    Boolean liked;
}
