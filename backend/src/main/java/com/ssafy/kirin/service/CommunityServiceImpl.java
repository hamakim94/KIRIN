package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.request.CommunityCommentWriteDTO;
import com.ssafy.kirin.dto.request.CommunityWriteDTO;
import com.ssafy.kirin.entity.Community;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityServiceImpl implements CommunityService {
    @Override
    public List<Community> getCommunityList(int starId) {
        return null;
    }

    @Override
    public boolean writeCommunity(int starId, CommunityWriteDTO dto) {
        return false;
    }

    @Override
    public Community getCommunity(int boardId) {
        return null;
    }

    @Override
    public Boolean likeCommunity(int userId, int boardId) {
        return null;
    }

    @Override
    public boolean unlikeCommunity(int userId, int boardId) {
        return false;
    }

    @Override
    public boolean writeComment(int userId, int communityId, CommunityCommentWriteDTO dto) {
        return false;
    }

    @Override
    public boolean likeCommunityComment(int userId, int commentId) {
        return false;
    }

    @Override
    public boolean unlikeCommunityComment(int userId, int commentId) {
        return false;
    }
}
