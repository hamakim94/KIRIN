package com.ssafy.kirin.controller;

import com.ssafy.kirin.entity.Community;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "커뮤니티 API",tags = {"커뮤니티 API"})
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class CommunityController {

    @GetMapping("/stars/{starId}")
    @ApiOperation(value = "커뮤니티 목록 최신순 나열")
    public ResponseEntity<List<Community>> communityList(@PathVariable(name = "starId") int starId){

        return null;
    }
}
