package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.ChallengeDTO;
import com.ssafy.kirin.entity.Challenge;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChallengeMapStruct {
    ChallengeMapStruct INSTANCE = Mappers.getMapper(ChallengeMapStruct.class);
    ChallengeDTO mapToChallengeDTO(Challenge challenge);
}
