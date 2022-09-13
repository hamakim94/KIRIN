package com.ssafy.kirin.controller;

import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.service.ChallengeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Api(value = "챌린지 API",tags = {"챌린지 API"})
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping("")
    @ApiOperation(value = "챌린지 리스트")
    public ResponseEntity<List<Challenge>> challengeList(@RequestParam(name = "scope",required = false, defaultValue = "") String scope,@RequestParam(name = "order",required = false, defaultValue = "") String order,
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

        return ResponseEntity.ok(list);
        }

    @GetMapping("/user/{userId}")
    @ApiOperation(value = "내가 좋아요한 챌린지 리스트")
    public ResponseEntity<List<Challenge>> likeChallengeList(@PathVariable("userId") int userId){

        return ResponseEntity.ok(challengeService.listUserLike(userId));

    }


}
