package com.ssafy.kirin.controller;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.CommunityCommentRequestDTO;
import com.ssafy.kirin.dto.request.CommunityRequestDTO;
import com.ssafy.kirin.dto.response.CommunityDTO;
import com.ssafy.kirin.dto.response.CommunityResponseDTO;
import com.ssafy.kirin.entity.Community;
import com.ssafy.kirin.service.CommunityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.List;

@Api(value = "커뮤니티 API",tags = {"커뮤니티 API"})
@RestController
@RequestMapping("/api/communities")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/stars/{starId}")
    @ApiOperation(value = "커뮤니티 목록 최신순 나열")
    public ResponseEntity<List<CommunityDTO>> communityList(@PathVariable(name = "starId") long starId){

        return ResponseEntity.ok(communityService.getCommunityList(starId));
    }

    @PostMapping("/stars/{starId}/boards")
    @ApiOperation(value = "커뮤니티 작성")
    public ResponseEntity<?> communityWrite(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                            @PathVariable long starId,
                                            @RequestPart MultipartFile image,
                                            @RequestPart CommunityRequestDTO communityRequestDTO){

        try {
            communityService.writeCommunity(starId,userDTO, communityRequestDTO, image);
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
    public ResponseEntity<?> communityLike(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                           @PathVariable long starId,
                                           @PathVariable long boardId){
        
        communityService.likeCommunity(userDTO.getId(), boardId);

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/stars/{starId}/boards/{boardId}")
    @ApiOperation(value = "커뮤니티 좋아요 취소")
    public ResponseEntity<?> communityUnlike(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                             @PathVariable Long starId,
                                             @PathVariable Long boardId){

        communityService.unlikeCommunity(userDTO.getId(), boardId);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/stars/{starId}/boards/{boardId}/comments")
    @ApiOperation(value = "커뮤니티 댓글 작성")
    public ResponseEntity<?> communityCommentWrite(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                                   @PathVariable Long boardId,
                                                   @RequestBody CommunityCommentRequestDTO communityCommentRequestDTO){

        communityService.writeComment(userDTO.getId(), boardId, communityCommentRequestDTO);

        return ResponseEntity.ok(null);
    }

    @PostMapping("/stars/{starId}/boards/{boardId}/comments/{commentId}")
    @ApiOperation(value = "커뮤니티 댓글 좋아요")
    public ResponseEntity<?> communityCommentLike(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                                  @PathVariable Long commentId){

        communityService.likeCommunityComment(userDTO.getId(), commentId);

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/stars/{starId}/boards/{boardId}/comments/{commentId}")
    @ApiOperation(value = "커뮤니티 댓글 좋아요 취소")
    public ResponseEntity<?> communityCommentUnlike(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                                    @PathVariable Long commentId){

        communityService.unlikeCommunityComment(userDTO.getId(), commentId);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/stars/{starId}/boards/{boardId}/comments")
    @ApiOperation(value = "커뮤니티 댓글 목록")
    public ResponseEntity<?> communityCommentList(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO, @PathVariable Long boardId){

        return ResponseEntity.ok(communityService.getCommunityComment(userDTO.getId(), boardId));
    }

    @GetMapping("/stars/{starId}/boards/{boardId}/comments/{commentId}")
    @ApiOperation(value = "커뮤니티 대댓글 목록")
    public ResponseEntity<?> communityRecommentList(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO, @PathVariable Long commentId){

        return ResponseEntity.ok(communityService.getCommunityRecomment(userDTO.getId(), commentId));
    }
}
