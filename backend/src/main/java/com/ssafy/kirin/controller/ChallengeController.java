package com.ssafy.kirin.controller;

import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.service.ChallengeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Api(value = "챌린지 API",tags = {"챌린지 API"})
@Slf4j
@RestController
@RequestMapping("/api/challenges")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @GetMapping("")
    @ApiOperation(value = "")
    public ResponseEntity<List<Challenge>> challengeList(@RequestParam(name = "scope",required = false, defaultValue = "") String scope,@RequestParam(name = "order",required = false, defaultValue = "") String order,
                                                         @RequestParam(name = "userid", required = false, defaultValue = "0") int userId, @RequestParam(name = "challengeid", required = false,defaultValue = "0") int challengeId){

        List<Challenge> list = switch (scope){
            case "stars" -> switch (order){
                case "popularity" -> challengeService.listStarsPopularity();
                case "latest" -> challengeService.listStarsLatest();
                default -> new ArrayList<>();
                };
            case "general" -> switch (order){
                case "popularity" -> challengeService.listGeneralPopularity();
                case "random" -> challengeService.listGeneralRandom();
                default -> new ArrayList<>();
                };
            case "all" -> switch (order){
                case "latest" -> {
                    if(challengeId>0) challengeService.listAllChallenge(challengeId);
                    else if(userId>0) challengeService.listAllUser(userId);
                    yield new ArrayList<>();
                }
                case "random" -> challengeService.listAllRandom();
                default -> new ArrayList<>();
                };
            default -> new ArrayList<>();
            };

        return ResponseEntity.ok(list);
        }


}
