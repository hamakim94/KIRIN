package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.request.CommunityCommentWriteDTO;
import com.ssafy.kirin.dto.request.CommunityWriteDTO;
import com.ssafy.kirin.entity.Community;

import java.util.List;

public interface CommunityService {
    List<Community> getCommunityList(int starId);
    boolean writeCommunity(int starId, CommunityWriteDTO dto);
    Community getCommunity(int boardId);
    Boolean likeCommunity(int userId, int boardId);
    boolean unlikeCommunity(int userId, int boardId);
    boolean writeComment(int userId, int communityId, CommunityCommentWriteDTO dto);
    boolean likeCommunityComment(int userId, int commentId);
    boolean unlikeCommunityComment(int userId, int commentId);

}
