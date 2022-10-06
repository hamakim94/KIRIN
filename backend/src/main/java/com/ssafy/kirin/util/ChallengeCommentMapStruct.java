package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.entity.ChallengeComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChallengeCommentMapStruct {
    ChallengeCommentMapStruct INSTANCE = Mappers.getMapper(ChallengeCommentMapStruct.class);
    @Mapping(source = "challengeComment.user.wallet.address", target = "user.walletAddress")
    ChallengeCommentDTO mapToChallengeCommentDTO(ChallengeComment challengeComment);
}
