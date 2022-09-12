package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.request.CommunityCommentWriteDTO;
import com.ssafy.kirin.dto.request.CommunityWriteDTO;
import com.ssafy.kirin.dto.response.CommunityDetailDTO;
import com.ssafy.kirin.entity.Community;

import java.util.List;

public interface CommunityService {
    List<Community> getCommunityList(long starId);
    boolean writeCommunity(long starId, CommunityWriteDTO dto);
    CommunityDetailDTO getCommunity(long boardId);
    boolean likeCommunity(long userId, long boardId);
    boolean unlikeCommunity(long userId, long boardId);
    boolean writeComment(long userId, long communityId, CommunityCommentWriteDTO dto);
    boolean likeCommunityComment(long userId, long commentId);
    boolean unlikeCommunityComment(long userId, long commentId);

}
