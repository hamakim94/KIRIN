package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.request.CommunityCommentWriteDTO;
import com.ssafy.kirin.dto.request.CommunityWriteDTO;
import com.ssafy.kirin.dto.response.CommunityDetailDTO;
import com.ssafy.kirin.entity.Community;

import java.io.IOException;
import java.util.List;

public interface CommunityService {
    List<Community> getCommunityList(long starId);
    void writeCommunity(long starId, CommunityWriteDTO dto) throws IOException;
    CommunityDetailDTO getCommunity(long boardId);
    boolean likeCommunity(long userId, long boardId);
    boolean unlikeCommunity(long userId, long boardId);
    void writeComment(long userId, long communityId, CommunityCommentWriteDTO dto);
    boolean likeCommunityComment(long userId, long commentId);
    boolean unlikeCommunityComment(long userId, long commentId);

}
