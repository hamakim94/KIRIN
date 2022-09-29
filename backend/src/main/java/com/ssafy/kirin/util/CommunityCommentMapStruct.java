package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.CommunityCommentDTO;
import com.ssafy.kirin.entity.CommunityComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommunityCommentMapStruct {
    CommunityCommentMapStruct INSTANCE = Mappers.getMapper(CommunityCommentMapStruct.class);
    @Mapping(source = "communityComment.user.wallet.address", target = "user.walletAddress")

    CommunityCommentDTO mapToCommunityCommentDTO(CommunityComment communityComment);
}
