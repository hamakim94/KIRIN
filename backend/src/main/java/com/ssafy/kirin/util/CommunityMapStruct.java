package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.CommunityDTO;
import com.ssafy.kirin.entity.Community;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommunityMapStruct {
    CommunityMapStruct INSTANCE = Mappers.getMapper(CommunityMapStruct.class);
    @Mapping(source = "community.user.wallet.address", target = "user.walletAddress")
    CommunityDTO mapToCommunityDTO(Community community);
}
