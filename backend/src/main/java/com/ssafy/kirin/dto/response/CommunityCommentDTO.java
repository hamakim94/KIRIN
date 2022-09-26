package com.ssafy.kirin.dto.response;

import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper
public class CommunityCommentDTO {

    Long id;
    String content;
    LocalDateTime reg;
    Boolean isComment;
    Long parentId;
    Long communityId;
    Integer reCommentCnt;
    Integer commentLikeCnt;
    UserResponseDTO user;
}
