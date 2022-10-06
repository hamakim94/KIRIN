package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.ChallengeDTO;
import com.ssafy.kirin.entity.CelebChallengeInfo;
import com.ssafy.kirin.entity.Challenge;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ChallengeMapStruct {
    ChallengeMapStruct INSTANCE = Mappers.getMapper(ChallengeMapStruct.class);

    @Mapping(source = "challenge.id",target = "id")
    @Mapping(source = "challenge.title",target = "title")
    @Mapping(source = "challenge.video",target = "video")
    @Mapping(source = "challenge.thumbnail",target = "thumbnail")
    @Mapping(source = "challenge.reg",target = "reg")
    @Mapping(source = "challenge.challengeId",target = "challengeId")
    @Mapping(source = "challenge.likeCnt",target = "likeCnt")
    @Mapping(source = "challenge.commentCnt",target = "commentCnt")
    @Mapping(source = "challenge.viewCnt",target = "viewCnt")
    @Mapping(source = "challenge.isProceeding",target = "isProceeding")
    @Mapping(source = "celebChallengeInfo.targetNum",target = "targetNum")
    @Mapping(source = "celebChallengeInfo.targetAmount",target = "targetAmount")
    @Mapping(source = "celebChallengeInfo.currentNum",target = "currentNum")
    @Mapping(source = "celebChallengeInfo.currentAmount",target = "currentAmount")
    @Mapping(source = "celebChallengeInfo.endDate",target = "endDate")
    @Mapping(source = "challenge.user.wallet.address", target = "user.walletAddress")
    @Mapping(source = "celebChallengeInfo.donationOrganization.name",target = "donationOrganizationName")
    ChallengeDTO mapToChallengeDTO(Challenge challenge, CelebChallengeInfo celebChallengeInfo);
}
