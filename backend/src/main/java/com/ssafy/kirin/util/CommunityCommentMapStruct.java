package com.ssafy.kirin.util;

import com.ssafy.kirin.dto.response.CommunityCommentDTO;
import com.ssafy.kirin.entity.CommunityComment;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommunityCommentMapStruct {
    CommunityCommentMapStruct INSTANT = Mappers.getMapper(CommunityCommentMapStruct.class);
    CommunityCommentDTO mapToCommunityCommentDTO(CommunityComment communityComment);
}
