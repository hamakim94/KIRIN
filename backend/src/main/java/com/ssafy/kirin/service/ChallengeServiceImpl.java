package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.ChallengeRequestDTO;
import com.ssafy.kirin.dto.request.ChallengeCommentRequestDTO;
import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.dto.response.ChallengeDTO;
import com.ssafy.kirin.dto.response.ChallengeSelectResponseDTO;
import com.ssafy.kirin.entity.*;
import com.ssafy.kirin.repository.ChallengeCommentRepository;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.repository.CelebChallengeInfoRepository;
import com.ssafy.kirin.repository.ChallengeLikeRepository;
import com.ssafy.kirin.repository.ChallengeRepository;
import com.ssafy.kirin.repository.UserRepository;
import com.ssafy.kirin.util.ChallengeCommentMapStruct;
import com.ssafy.kirin.util.ChallengeMapStruct;
import com.ssafy.kirin.util.NotificationEnum;
import com.ssafy.kirin.util.UserMapStruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final ChallengeLikeRepository challengeLikeRepository;
    private final ChallengeCommentRepository challengeCommentRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final CelebChallengeInfoRepository celebChallengeInfoRepository;
    @Value("${property.app.upload-path}")
    private String challengeDir;

    @Override
    public List<Challenge> listStarsByPopularity() {
        return challengeRepository.findByIsOriginalAndIsProceeding(true, true, Sort.by(Sort.Direction.DESC, "likeCnt"));
    }

    @Override
    public List<Challenge> listStarsByLatest() {
        return challengeRepository.findByIsOriginalAndIsProceeding(true, true, Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public List<Challenge> listGeneralByPopularity() {
        return challengeRepository.findByIsOriginalAndIsProceeding(false, true, Sort.by(Sort.Direction.DESC, "likeCnt"));
    }

    @Override
    public List<Challenge> listGeneralByRandom() {
        List<Challenge> challenges = challengeRepository.findByIsOriginalAndIsProceeding(false, true);
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<Challenge> listAllByRandom() {
        List<Challenge> challenges = challengeRepository.findByIsProceeding(true);
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<Challenge> listAllByAlphabet() {
        return challengeRepository.findAll(Sort.by(Sort.Direction.ASC, "title"));
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
    public List<ChallengeDTO> listUserLike(long userId) {
        return challengeLikeRepository.findByUserId(userId).stream()
                .map(ChallengeLike::getChallenge).map(o -> {
                    ChallengeDTO dto = ChallengeMapStruct.INSTANCE.mapToChallengeDTO(o);
                    dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
                    return dto;
                }).collect(Collectors.toList());
    }

    @Override
    public List<ChallengeCommentDTO> getChallengeComment(long challengeId) {

        return challengeCommentRepository.findByChallengeId(challengeId).stream().map(o -> {
            ChallengeCommentDTO dto = ChallengeCommentMapStruct.INSTANCE.mapToChallengeCommentDTO(o);
            dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public void writeChallengeComment(long userId, long challengeId, ChallengeCommentRequestDTO dto) {
        User user = userRepository.getReferenceById(userId);
        Challenge challenge = challengeRepository.getReferenceById(challengeId);
        ChallengeComment challengeComment = ChallengeComment.builder()
                .challengeId(challengeId).user(user).isComment(dto.isComment())
                .content(dto.content()).reg(LocalDateTime.now())
                .build();
        challengeCommentRepository.save(challengeComment);
        // 챌린지 게시자에게 알림
        notificationService.addNotification(Notification.builder().userId(challenge.getUser().getId())
                .event(String.format(NotificationEnum.CommentAdded.getContent(), challenge.getTitle(), user.getNickname()))
                .challenge(challenge).challengeComment(challengeComment).build());

        if (dto.parentId() != null && dto.parentId() > 0) {
            //부모댓글 설정
            challengeComment.setParentId(dto.parentId());
            // 챌린지 내 댓글 게시자에게 알림
            Optional<ChallengeComment> tmp = challengeCommentRepository.findById(dto.parentId());
            tmp.ifPresent(comment -> notificationService.addNotification(Notification.builder().userId(comment.getUser().getId())
                    .event(String.format(NotificationEnum.CommentReplied.getContent(), user.getNickname()))
                    .challengeComment(challengeComment).challenge(challenge).build()));
            //해당 댓굴의 대댓글 게시자 모두에게 알림
            List<Long> list = challengeCommentRepository.findByParentId(dto.parentId()).stream()
                    .map(o -> o.getUser().getId()).collect(Collectors.toSet()).stream().toList();

            for (Long id : list) {
                notificationService.addNotification(Notification.builder()
                        .event(String.format(NotificationEnum.CommentReplied.getContent(), user.getNickname()))
                        .challenge(challenge).challengeComment(challengeComment)
                        .build());
            }
        }
    }

    @Override
    public List<ChallengeSelectResponseDTO> selectChallenge() {

        return challengeRepository.findByIsOriginalAndIsProceeding(true, true, Sort.by(Sort.Direction.DESC, "id"))
                .stream().map(o ->
                        new ChallengeSelectResponseDTO(o.getTitle(), o.getUser().getNickname(),
                                o.getCelebChallengeInfo().getStampImg(),
                                o.getCelebChallengeInfo().getSound(), null)
                ).collect(Collectors.toList());
    }

    @Scheduled(initialDelay = 1000, fixedRateString = "${challenge.expiration.check-interval}")
    @Transactional
    public void scheduleChallenge() {
        // get list of expired stars' challeges
        // expire stars' challenge and expire following challeges along with notification sent
        challengeRepository.findByIsOriginalAndIsProceedingAndCelebChallengeInfo_EndDateBefore(true, true, LocalDateTime.now())
                .forEach(o -> {o.setIsProceeding(false);
                                //get list of following challenges
                                challengeRepository.findByChallengeId(o.getId())
                                        .forEach(c -> {
                                            //expire following challenge
                                            c.setIsProceeding(false);
                                            //send notifiaction
                                            notificationService.addNotification(Notification.builder()
                                                    .userId(c.getUser().getId()).challenge(o).event(String.format(NotificationEnum.ChallengeEnd.getContent(), o.getTitle()))
                                                    .build());
                    });
        });


    }

    @Transactional
    @Override
    public boolean createChallenge(UserDTO userDTO, ChallengeRequestDTO challengeRequestDTO, MultipartFile video) throws IOException {
        try {
            User user = userRepository.getReferenceById(userDTO.getId());
            Challenge forChallenge = challengeRepository.getReferenceById(challengeRequestDTO.challengeId());
            // 원 챌린지 음악과 이미지 저장경로
            String musicPath = forChallenge.getCelebChallengeInfo().getSound();
            String imgPath = forChallenge.getCelebChallengeInfo().getStampImg();

            // 비디오 외 정보 저장
            Challenge challenge = challengeRepository.save(Challenge.builder().user(user).isProceeding(true).reg(LocalDateTime.now())
                    .title(challengeRequestDTO.title()).isOriginal(challengeRequestDTO.isOriginal()).challengeId(challengeRequestDTO.challengeId())
                    .build());

            Path outputTmp = Paths.get((challengeDir + challenge.getId() + "Tmp.mp4"));
            Files.copy(video.getInputStream(), outputTmp);
            String outputPath = challengeDir + challenge.getId() + ".mp4";

            String command = String.format("ffmpeg -y -i %s -i %s -i %s -filter_complex [1][0]scale2ref=w=oh*mdar:h=ih*0.1[logo][video];[video][logo]overlay=W-w-15:15 -map \"v\" -map 2:a -c:v libx264 -crf 17 -c:a copy -shortest %s"
                    , outputTmp, imgPath, musicPath, outputPath);

            Files.delete(outputTmp);
            Process p = Runtime.getRuntime().exec(command);
            p.waitFor();
            challenge.setVideo(outputPath);

        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        return true;
    }
}