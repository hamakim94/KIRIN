package com.ssafy.kirin.controller;

import com.ssafy.kirin.dto.request.CommunityCommentWriteDTO;
import com.ssafy.kirin.dto.request.CommunityWriteDTO;
import com.ssafy.kirin.dto.response.CommunityDetailDTO;
import com.ssafy.kirin.entity.Community;
import com.ssafy.kirin.service.CommunityService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "커뮤니티 API",tags = {"커뮤니티 API"})
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/stars/{starId}")
    @ApiOperation(value = "커뮤니티 목록 최신순 나열")
    public ResponseEntity<List<Community>> communityList(@PathVariable(name = "starId") int starId){

        return null;
    }

    @PostMapping("/stars/{starId}/boards")
    @ApiOperation(value = "커뮤니티 작성")
    public ResponseEntity<?> communityWrite(@PathVariable long starId,CommunityWriteDTO communityWriteDTO){

        communityService.writeCommunity(starId,communityWriteDTO);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/stars/{starId}/boards/{boardId}")
    @ApiOperation(value = "커뮤니티 상세 조회")
    public ResponseEntity<CommunityDetailDTO> communityDetail(@PathVariable int starId, @PathVariable int boardId){

        CommunityDetailDTO response = communityService.getCommunity(boardId);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/stars/{starId}/boards/{boardId}")
    @ApiOperation(value = "커뮤니티 좋아요")
    public ResponseEntity<?> communityLike(@PathVariable long starId, @PathVariable long boardId){
        
        //TODO : Authentication Pricipal 받아서 채우기

        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/stars/{starId}/boards/{boardId}")
    @ApiOperation(value = "커뮤니티 좋아요")
    public ResponseEntity<?> communityUnlike(@PathVariable long starId, @PathVariable long boardId){

        //TODO : Authentication Pricipal 받아서 채우기

        return ResponseEntity.ok(null);
    }

    @PostMapping("/stars/{starId}/boards/{boardId}/comments")
    @ApiOperation(value = "커뮤니티 댓글 작성")
    public ResponseEntity<?> communityCommentWrite(CommunityCommentWriteDTO dto){

        //TODO : Authentication Pricipal 받아서 채우기

        return ResponseEntity.ok(null);
    }

}
