package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.CommunityCommentRequestDTO;
import com.ssafy.kirin.dto.request.CommunityRequestDTO;
import com.ssafy.kirin.dto.response.CommunityCommentDTO;
import com.ssafy.kirin.dto.response.CommunityDTO;
import com.ssafy.kirin.dto.response.CommunityResponseDTO;
import com.ssafy.kirin.entity.*;
import com.ssafy.kirin.repository.*;
import com.ssafy.kirin.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityServiceImpl implements CommunityService {
    private final CommunityRepository communityRepository;
    private final CommunityCommentRepository communityCommentRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityCommentLikeRepository communityCommentLikeRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    @Value("${property.app.upload-path}")
    private String communityImageDirectory;

    @Override
    public List<CommunityDTO> getCommunityList(long starId) {

        UserDTO userDTO = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(userDTO!=null) {
            Set<Long> set = communityLikeRepository.findByUserId(userDTO.getId())
                    .stream().map(CommunityLike::getCommunityId).collect(Collectors.toSet());

            return communityRepository.findAllByUserId(starId).stream()
                    .map(o-> {
                        CommunityDTO dto = CommunityMapStruct.INSTANCE.mapToCommunityDTO(o);
                        dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
                        if(set.contains(o.getId())) dto.setLiked(true);
                        return dto;
                    }).collect(Collectors.toList());
        }

        return communityRepository.findAllByUserId(starId).stream()
                .map(o-> {
                    CommunityDTO dto = CommunityMapStruct.INSTANCE.mapToCommunityDTO(o);
                    dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
                    return dto;
                }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void writeCommunity(long starId, UserDTO userDTO, CommunityRequestDTO dto, MultipartFile image) throws IOException {
        
        User user = userRepository.getReferenceById(userDTO.getId());
        Community community = Community.builder()
                .user(user)
                .content(dto.content())
                .reg(LocalDateTime.now())
                .build();

        communityRepository.save(community);

        if(!image.isEmpty()) {
            // 파일 디렉토리 + UUID + 확장자로 Path 설정
            String fileName = UUID.randomUUID() + image.getOriginalFilename();
            String storeName = communityImageDirectory + fileName;
            Path dir = Paths.get(storeName);
            //지정된 디렉토리에 저장
            Files.copy(image.getInputStream(),dir);
            community.setImg(fileName);
        }
    }

    @Override
    public CommunityResponseDTO getCommunity(long boardId) {

        UserDTO userDTO = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Community community = communityRepository.findById(boardId);
        CommunityDTO communityDTO = CommunityMapStruct.INSTANCE.mapToCommunityDTO(community);
        if(userDTO!=null) {
            communityDTO.setLiked(communityLikeRepository.existsByUserIdAndCommunityId(userDTO.getId(),community.getId()));
            Set<Long> commentLikeSet = communityCommentLikeRepository.findByUserId(userDTO.getId())
                    .stream().map(CommunityCommentLike::getCommunityCommentId).collect(Collectors.toSet());

            return new CommunityResponseDTO(communityDTO,
                    communityCommentRepository.findByCommunityId(boardId).stream().map(o->{
                        CommunityCommentDTO dto = CommunityCommentMapStruct.INSTANCE.mapToCommunityCommentDTO(o);
                        dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
                        if(commentLikeSet.contains(o.getId())) dto.setLiked(true);
                        return dto;
                    }).collect(Collectors.toList()));
        }


        return  new CommunityResponseDTO(communityDTO,
                communityCommentRepository.findByCommunityId(boardId).stream().map(o->{
                                                CommunityCommentDTO dto = CommunityCommentMapStruct.INSTANCE.mapToCommunityCommentDTO(o);
                                                dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
                                                return dto;
                                            }).collect(Collectors.toList()));
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
    public List<CommunityCommentDTO> getCommunityComment(Long userId, Long communityId) {
        Set<Long> set = communityCommentLikeRepository.findByUserId(userId) // 본인이 좋아요 했는지 여부
                .stream().map(CommunityCommentLike::getCommunityCommentId).collect(Collectors.toSet());

        return communityCommentRepository.findByCommunityId(communityId).stream().map(o -> {
            CommunityCommentDTO dto = CommunityCommentMapStruct.INSTANCE.mapToCommunityCommentDTO(o);
            dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));

            if(set.contains(o.getId())) dto.setLiked(true);

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<CommunityCommentDTO> getCommunityRecomment(Long userId, Long commentId) {
        Set<Long> set = communityCommentLikeRepository.findByUserId(userId) // 본인이 좋아요 했는지 여부
                .stream().map(CommunityCommentLike::getCommunityCommentId).collect(Collectors.toSet());

        return communityCommentRepository.findByParentId(commentId).stream().map(o -> {
            CommunityCommentDTO dto = CommunityCommentMapStruct.INSTANCE.mapToCommunityCommentDTO(o);
            dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));

            if(set.contains(o.getId())) dto.setLiked(true);

            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void writeComment(long userId, long communityId, CommunityCommentRequestDTO dto) {

        User user = userRepository.getReferenceById(userId);

        CommunityComment communityComment = CommunityComment.builder()
                .content(dto.content())
                .reg(LocalDateTime.now())
                .communityId(communityId)
                .user(user)
                .parentId(dto.parentId())
                .build();

        communityCommentRepository.save(communityComment);

        // 댓글 게시자에게 알림
        if(dto.parentId() != 0){ // 대댓글 작성인 경우
            Community community = communityRepository.getReferenceById(communityId);

            Notification notification = Notification.builder().community(community)
                    .communityComment(communityComment).userId(community.getUser().getId())
                    .event(String.format(NotificationEnum.CommentReplied.getContent(), user.getNickname()))
                    .build();

            notificationService.addNotification(notification);

            // 대댓글 게시자에게 알림
            List<Long> list = communityCommentRepository.findByParentId(dto.parentId()).stream()
                    .map(o-> o.getUser().getId()).collect(Collectors.toSet()).stream().toList();

            for(Long id: list){
                notificationService.addNotification(Notification.builder()
                                .event(String.format(NotificationEnum.CommentReplied.getContent(), user.getNickname()))
                                .communityComment(communityComment)
                                .community(community).userId(id)
                            .build());
            }
        }
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
