package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.request.CommunityCommentWriteDTO;
import com.ssafy.kirin.dto.request.CommunityWriteDTO;
import com.ssafy.kirin.dto.response.CommunityDetailDTO;
import com.ssafy.kirin.entity.*;
import com.ssafy.kirin.repository.CommunityCommentRepository;
import com.ssafy.kirin.repository.CommunityCommnetLikeRepository;
import com.ssafy.kirin.repository.CommunityLikeRepository;
import com.ssafy.kirin.repository.CommunityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityCommentRepository communityCommentRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityCommnetLikeRepository communityCommentLikeRepository;
    @Value("#{community.image.directory}")
    private String communityImageDirectory;

    @Override
    public List<Community> getCommunityList(long starId) {
        return communityRepository.findAllByUserId(starId);
    }

    @Override
    @Transactional
    public boolean writeCommunity(long starId, CommunityWriteDTO dto) {

        User user = User.builder().id(starId).build();

        Community community = Community.builder()
                .title(dto.title())
                .content(dto.content())
                .reg(LocalDateTime.now())
                .user(user)
                .build();

        communityRepository.save(community);

        long boardId = community.getId();

        if(dto.image()!=null)try {
            MultipartFile file = dto.image();
            FileOutputStream fos = new FileOutputStream(communityImageDirectory+file.getOriginalFilename());
            InputStream is;

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
        return true;
    }

    @Override
    public CommunityDetailDTO getCommunity(long boardId) {

        Community community = communityRepository.findById(boardId);
        List<CommunityComment> commentList = communityCommentRepository.findByBoardId(boardId);

        return new CommunityDetailDTO(community, commentList);
    }

    @Override
    public boolean likeCommunity(long userId, long boardId) {

        CommunityLike communityLike = CommunityLike.builder()
                .userId(userId).communityId(boardId).build();
        communityLikeRepository.save(communityLike);

        return true;
    }

    @Override
    public boolean unlikeCommunity(long userId, long boardId) {

        communityLikeRepository.deleteByUserIdAndCommunityId(userId, boardId);

        return true;
    }
    @Override
    @Transactional
    public boolean writeComment(long userId, long communityId, CommunityCommentWriteDTO dto) {



        CommunityComment communityComment = CommunityComment.builder()
                .content(dto.content()).reg(LocalDateTime.now())
                .isComment(dto.isComment()).parentId(dto.parentId())
                .userId(userId).build();
        communityCommentRepository.save(communityComment);

        return true;
    }

    @Override
    public boolean likeCommunityComment(long userId, long commentId) {
        CommunityCommentLike communityCommentLike = CommunityCommentLike.builder()
                .userId(userId).communityCommentId(commentId).build();
        communityCommentLikeRepository.save(communityCommentLike);

        return true;
    }

    @Override
    public boolean unlikeCommunityComment(long userId, long commentId) {
        communityCommentLikeRepository.deleteByUserIdAndCommunityCommentId(userId, commentId);
        return true;
    }
}
