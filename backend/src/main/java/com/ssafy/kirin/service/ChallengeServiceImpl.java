package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.ChallengeRequestDTO;
import com.ssafy.kirin.entity.CelebChallengeInfo;
import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.entity.ChallengeLike;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.repository.CelebChallengeInfoRepository;
import com.ssafy.kirin.repository.ChallengeLikeRepository;
import com.ssafy.kirin.repository.ChallengeRepository;
import com.ssafy.kirin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeLikeRepository challengeLikeRepository;
    private final CelebChallengeInfoRepository celebChallengeInfoRepository;
    private final UserRepository userRepository;
    @Value("${challenge.dir}")
    private final String challengeDir;

    @Override
    public List<Challenge> listStarsByPopularity() {
        return challengeRepository.findByIsOriginal(true, Sort.by(Sort.Direction.DESC,"likeCnt"));
    }

    @Override
    public List<Challenge> listStarsByLatest() {
        return challengeRepository.findByIsOriginal(true, Sort.by(Sort.Direction.DESC,"id"));
    }

    @Override
    public List<Challenge> listGeneralByPopularity() {
        return challengeRepository.findByIsOriginal(false,Sort.by(Sort.Direction.DESC,"likeCnt"));
    }

    @Override
    public List<Challenge> listGeneralByRandom() {
        List<Challenge> challenges = challengeRepository.findByIsOriginal(false);
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<Challenge> listAllByRandom() {
        List<Challenge> challenges = challengeRepository.findAll();
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<Challenge> listAllByAlphabet() {
        return challengeRepository.findAll(Sort.by(Sort.Direction.ASC,"title"));
    }

    @Override
    public List<Challenge> listAllByChallenge(long challengeId) {
        return challengeRepository.findByChallengeId(challengeId);
    }

    @Override
    public List<Challenge> listAllByUser(long userId) {
        return challengeRepository.findByUserId(userId);
    }

    @Override
    public List<Challenge> listUserLike(long userId) {
        return challengeLikeRepository.findByUserId(userId).stream()
                .map(ChallengeLike::getChallenge).collect(Collectors.toList());
    }
    @Transactional
    @Override
    public boolean createChallenge(UserDTO userDTO, ChallengeRequestDTO challengeRequestDTO) throws IOException {
        try {
        User user = userRepository.getReferenceById(userDTO.getId());
        Challenge forChallenge = challengeRepository.getReferenceById(challengeRequestDTO.challengeId());
        String musicPath = forChallenge.getCelebChallengeInfo().getSound();
        String imgPath = forChallenge.getCelebChallengeInfo().getStampImg();

        // 비디오 외 정보 저장
        Challenge challenge = challengeRepository.save(Challenge.builder().user(user).isDummy(false).reg(LocalDateTime.now())
                .title(challengeRequestDTO.title()).isOriginal(challengeRequestDTO.isOriginal())
                .build());

        Path outputTmp = Paths.get((challengeDir+challenge.getId()+"Tmp.mp4"));
        Files.copy(challengeRequestDTO.video().getInputStream(),outputTmp);
        String outputPath = challengeDir+challenge.getId()+".mp4";

        String command = String.format("ffmpeg -y -i %s -i %s -i %s -filter_complex [1][0]scale2ref=w=oh*mdar:h=ih*0.1[logo][video];[video][logo]overlay=W-w-15:15 -map \"v\" -map 2:a -c:v libx264 -crf 17 -c:a copy -shortest %s"
            ,outputPath,imgPath,musicPath,outputPath);


        Process p = Runtime.getRuntime().exec(command);
        p.waitFor();
        challenge.setVideo(outputPath);

        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return true;
    }
}
