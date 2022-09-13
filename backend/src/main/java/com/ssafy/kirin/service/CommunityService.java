package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.request.CommunityCommentRequestDTO;
import com.ssafy.kirin.dto.request.CommunityRequestDTO;
import com.ssafy.kirin.dto.response.CommunityResponseDTO;
import com.ssafy.kirin.entity.Community;

import java.io.IOException;
import java.util.List;

public interface CommunityService {
    List<Community> getCommunityList(long starId);
    void writeCommunity(long starId, CommunityRequestDTO dto) throws IOException;
    CommunityResponseDTO getCommunity(long boardId);
    boolean likeCommunity(long userId, long boardId);
    boolean unlikeCommunity(long userId, long boardId);
    void writeComment(long userId, long communityId, CommunityCommentRequestDTO dto);
    boolean likeCommunityComment(long userId, long commentId);
    boolean unlikeCommunityComment(long userId, long commentId);

}
