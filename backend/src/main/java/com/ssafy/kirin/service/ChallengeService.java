package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.request.ChallengeCommentRequestDTO;
import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.entity.ChallengeComment;

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
    List<ChallengeComment> getChallengeComment(long challengeId);
    void writeChallengeComment(long userId, long challengeId,
                               ChallengeCommentRequestDTO challengeCommentRequestDTO);
}
