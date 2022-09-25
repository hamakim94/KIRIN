package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.ChallengeRequestDTO;
import com.ssafy.kirin.dto.request.ChallengeCommentRequestDTO;
import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.entity.ChallengeComment;

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
    List<ChallengeComment> getChallengeComment(long challengeId);
    void writeChallengeComment(long userId, long challengeId,
                               ChallengeCommentRequestDTO challengeCommentRequestDTO);
}
