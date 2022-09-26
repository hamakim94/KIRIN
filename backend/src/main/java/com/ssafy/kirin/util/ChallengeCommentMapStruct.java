package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.entity.ChallengeComment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChallengeCommentMapStruct {
    ChallengeCommentMapStruct INSTANCE = Mappers.getMapper(ChallengeCommentMapStruct.class);
    ChallengeCommentDTO mapToChallengeCommentDTO(ChallengeComment challengeComment);
}
