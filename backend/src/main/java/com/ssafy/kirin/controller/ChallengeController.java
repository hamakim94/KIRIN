package com.ssafy.kirin.controller;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.ChallengeCommentRequestDTO;
import com.ssafy.kirin.dto.request.ChallengeRequestDTO;
import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.dto.response.ChallengeDTO;
import com.ssafy.kirin.dto.response.ChallengeSelectResponseDTO;
import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.entity.ChallengeComment;
import com.ssafy.kirin.service.ChallengeService;
import com.ssafy.kirin.util.ChallengeMapStruct;
import com.ssafy.kirin.util.UserMapStruct;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Api(value = "챌린지 API",tags = {"챌린지 API"})
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {
    private final ChallengeService challengeService;

    @GetMapping("")
    @ApiOperation(value = "챌린지 리스트")
    public ResponseEntity<List<ChallengeDTO>> challengeList(@RequestParam(name = "scope",required = false, defaultValue = "") String scope, @RequestParam(name = "order",required = false, defaultValue = "") String order,
                                                            @RequestParam(name = "userid", required = false, defaultValue = "0") int userId, @RequestParam(name = "challengeid", required = false,defaultValue = "0") int challengeId){
        List<Challenge> list = switch (scope){
            case "stars" -> switch (order){
                case "popularity" -> challengeService.listStarsByPopularity();
                case "latest" -> challengeService.listStarsByLatest();
                default -> new ArrayList<>();
                };
            case "general" -> switch (order){
                case "popularity" -> challengeService.listGeneralByPopularity();
                case "random" -> challengeService.listGeneralByRandom();
                default -> new ArrayList<>();
                };
            case "all" -> switch (order){
                case "latest" -> {
                    if(challengeId>0) yield challengeService.listAllByChallenge(challengeId);
                    else if(userId>0) yield challengeService.listAllByUser(userId);
                    else yield new ArrayList<>();
                }
                case "random" -> challengeService.listAllByRandom();
                case "alphabet" -> challengeService.listAllByAlphabet();
                default -> new ArrayList<>();
                };
            default -> new ArrayList<>();
            };



        return ResponseEntity.ok(list.stream()
                .map(o->{
                    ChallengeDTO dto = ChallengeMapStruct.INSTANCE.mapToChallengeDTO(o);
                    dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
                    return dto;
                })
                .collect(Collectors.toList()));
        }

    @GetMapping("/user/{userId}")
    @ApiOperation(value = "내가 좋아요한 챌린지 리스트")
    public ResponseEntity<List<ChallengeDTO>> likeChallengeList(@PathVariable("userId") Long userId){

        return ResponseEntity.ok(challengeService.listUserLike(userId));
    }

    @GetMapping("/")

    @PostMapping("/comment/{challengeId}")
    @ApiOperation(value = "챌린지 댓글 등록")
    public ResponseEntity<?> challengeCommentWrite(@PathVariable("challengeId") Long challengeId,
                                                   @ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                                   @RequestBody ChallengeCommentRequestDTO challengeCommentRequestDTO){

        challengeService.writeChallengeComment(userDTO.getId(), challengeId, challengeCommentRequestDTO);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/comment/{challengeId}")
    @ApiOperation(value = "챌린지 댓글")
    public ResponseEntity<List<ChallengeCommentDTO>> challengeCommentList(@PathVariable("challengeId") Long challengeId){

        return ResponseEntity.ok(challengeService.getChallengeComment(challengeId));
    }


    @PostMapping("")
    @ApiOperation(value = "챌린지 등록")
    public ResponseEntity<?> challengeUpload(@ApiIgnore @AuthenticationPrincipal UserDTO userDTO,
                                             @RequestPart MultipartFile video,
                                             @RequestPart ChallengeRequestDTO challengeRequestDTO){

        System.out.println("I'M IN CHALLENGE CONTROLLER");
        try {
            challengeService.createChallenge(userDTO, challengeRequestDTO, video);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping("/select")
    @ApiOperation(value = "진행 중 챌린지 목록 조회 - 등록용")
    public ResponseEntity<List<ChallengeSelectResponseDTO>> challengeSelect(){

        return ResponseEntity.ok(challengeService.selectChallenge());
    }
}
