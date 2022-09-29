package com.ssafy.kirin.dto.response;

import lombok.*;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommunityDTO {
    Long id;
    String content;
    String img;
    LocalDateTime reg;
    Integer likeCnt;
    Integer commentCnt;
    UserResponseDTO user;
    Boolean liked;
}
