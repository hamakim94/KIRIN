package com.ssafy.kirin.service;

import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeRepository challengeLikeRepository;

    @Override
    public List<Challenge> listStarsPopularity() {
        return challengeRepository.findByIsOriginal(true, Sort.by(Sort.Direction.DESC,"likeCnt"));
    }

    @Override
    public List<Challenge> listStarsLatest() {
        return challengeRepository.findByIsOriginal(true, Sort.by(Sort.Direction.DESC,"id"));
    }

    @Override
    public List<Challenge> listGeneralPopularity() {
        return challengeRepository.findByIsOriginal(false,Sort.by(Sort.Direction.DESC,"likeCnt"));
    }

    @Override
    public List<Challenge> listGeneralRandom() {
        List<Challenge> challenges = challengeRepository.findByIsOriginal(false);
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<Challenge> listAllRandom() {
        List<Challenge> challenges = challengeRepository.findAll();
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<Challenge> listAllChallenge(long challengeId) {
        return challengeRepository.findByChallengeId(challengeId);
    }

    @Override
    public List<Challenge> listAllUser(long userId) {
        return challengeRepository.findByUserId(userId);
    }

    @Override
    public List<Challenge> listUserLike(long userId) {
        return challengeLikeRepository.findByUserId(userId);
    }
}
