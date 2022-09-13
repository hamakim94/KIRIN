package com.ssafy.kirin.controller;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.CommunityCommentRequestDTO;
import com.ssafy.kirin.dto.request.CommunityRequestDTO;
import com.ssafy.kirin.dto.response.CommunityResponseDTO;
import com.ssafy.kirin.entity.Community;
import com.ssafy.kirin.service.CommunityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@Api(value = "커뮤니티 API",tags = {"커뮤니티 API"})
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/stars/{starId}")
    @ApiOperation(value = "커뮤니티 목록 최신순 나열")
    public ResponseEntity<List<Community>> communityList(@PathVariable(name = "starId") long starId){

        return ResponseEntity.ok(communityService.getCommunityList(starId));
    }

    @PostMapping("/stars/{starId}/boards")
    @ApiOperation(value = "커뮤니티 작성")
    public ResponseEntity<?> communityWrite(@PathVariable long starId, CommunityRequestDTO communityRequestDTO){

        try {
            communityService.writeCommunity(starId, communityRequestDTO);
            return ResponseEntity.ok(null);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/stars/{starId}/boards/{boardId}")
    @ApiOperation(value = "커뮤니티 상세 조회")
    public ResponseEntity<CommunityResponseDTO> communityDetail(@PathVariable int starId, @PathVariable int boardId){

        CommunityResponseDTO response = communityService.getCommunity(boardId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/stars/{starId}/boards/{boardId}")
    @ApiOperation(value = "커뮤니티 좋아요")
    public ResponseEntity<?> communityLike(@AuthenticationPrincipal UserDTO userDTO, @PathVariable long starId, @PathVariable long boardId){
        
        communityService.likeCommunity(userDTO.getId(), boardId);

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/stars/{starId}/boards/{boardId}")
    @ApiOperation(value = "커뮤니티 좋아요 취소")
    public ResponseEntity<?> communityUnlike(@AuthenticationPrincipal UserDTO userDTO, @PathVariable long starId, @PathVariable long boardId){

        communityService.unlikeCommunity(userDTO.getId(), boardId);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/stars/{starId}/boards/{boardId}/comments")
    @ApiOperation(value = "커뮤니티 댓글 작성")
    public ResponseEntity<?> communityCommentWrite(@AuthenticationPrincipal UserDTO userDTO, @PathVariable long boardId, CommunityCommentRequestDTO dto){

        communityService.writeComment(userDTO.getId(), boardId, dto);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/stars/{starId}/boards/{boardId}/comments/{commentId}")
    @ApiOperation(value = "커뮤니티 댓글 좋아요")
    public ResponseEntity<?> communityCommentLike(@AuthenticationPrincipal UserDTO userDTO, @PathVariable long commentId){

        communityService.likeCommunityComment(userDTO.getId(), commentId);

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/stars/{starId}/boards/{boardId}/comments/{commentId}")
    @ApiOperation(value = "커뮤니티 댓글 좋아요 취소")
    public ResponseEntity<?> communityCommentUnlike(@AuthenticationPrincipal UserDTO userDTO, @PathVariable long commentId){

        communityService.unlikeCommunityComment(userDTO.getId(), commentId);

        return ResponseEntity.ok(null);
    }

}
