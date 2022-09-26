package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.CommunityDTO;
import com.ssafy.kirin.entity.Community;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommunityMapStruct {
    CommunityMapStruct INSTANCE = Mappers.getMapper(CommunityMapStruct.class);
    CommunityDTO mapToCommunityDTO(Community community);
}
