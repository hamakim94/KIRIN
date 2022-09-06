package com.ssafy.kirin.service;

import com.ssafy.kirin.entity.Challenge;

import java.util.List;

public interface ChallengeService {

    List<Challenge> listStarsPopularity();
    List<Challenge> listStarsLatest();
    List<Challenge> listGeneralPopularity();
    List<Challenge> listGeneralRandom();
    List<Challenge> listAllRandom();
    List<Challenge> listAllChallenge(long challengeId);
    List<Challenge> listAllUser(long userId);
    List<Challenge>  listUserLike();
}
