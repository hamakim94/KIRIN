package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.ChallengeRequestDTO;
import com.ssafy.kirin.entity.Challenge;

import java.io.IOException;
import java.util.List;

public interface ChallengeService {
    List<Challenge> listStarsByPopularity();
    List<Challenge> listStarsByLatest();
    List<Challenge> listGeneralByPopularity();
    List<Challenge> listGeneralByRandom();
    List<Challenge> listAllByRandom();
    List<Challenge> listAllByAlphabet();
    List<Challenge> listAllByChallenge(long challengeId);
    List<Challenge> listAllByUser(long userId);
    List<Challenge> listUserLike(long userId);
    boolean createChallenge(UserDTO userDTO, ChallengeRequestDTO challengeRequestDTO) throws IOException;
}
