package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.CommunityCommentRequestDTO;
import com.ssafy.kirin.dto.request.CommunityRequestDTO;
import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.dto.response.CommunityCommentDTO;
import com.ssafy.kirin.dto.response.CommunityDTO;
import com.ssafy.kirin.dto.response.CommunityResponseDTO;
import com.ssafy.kirin.entity.Community;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.management.MemoryUsage;
import java.util.List;

public interface CommunityService {
    List<CommunityDTO> getCommunityList(long starId);
    void writeCommunity(long starId,UserDTO userDTO, CommunityRequestDTO dto, MultipartFile image) throws IOException;
    CommunityResponseDTO getCommunity(long boardId);
    boolean likeCommunity(long userId, long boardId);
    boolean unlikeCommunity(long userId, long boardId);
    List<CommunityCommentDTO> getCommunityComment(Long userId, Long boardId);
    List<CommunityCommentDTO> getCommunityRecomment(Long userId, Long commentId);
    void writeComment(long userId, long communityId, CommunityCommentRequestDTO dto);
    boolean likeCommunityComment(long userId, long communityId);
    boolean unlikeCommunityComment(long userId, long commentId);

}
