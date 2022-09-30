package com.ssafy.kirin.dto.response;

import lombok.*;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommunityCommentDTO {

    Long id;
    String content;
    LocalDateTime reg;
    Long parentId;
    Long communityId;
    Integer reCommentCnt;
    Integer likeCnt;
    UserResponseDTO user;
    Boolean liked;
}
