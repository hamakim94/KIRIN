package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.ChallengeRequestDTO;
import com.ssafy.kirin.dto.request.ChallengeCommentRequestDTO;
import com.ssafy.kirin.dto.request.StarChallengeRequestDTO;
import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.dto.response.ChallengeDTO;
import com.ssafy.kirin.dto.response.ChallengeSelectResponseDTO;
import com.ssafy.kirin.entity.*;
import com.ssafy.kirin.repository.*;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.util.ChallengeCommentMapStruct;
import com.ssafy.kirin.util.ChallengeMapStruct;
import com.ssafy.kirin.util.NotificationEnum;
import com.ssafy.kirin.util.UserMapStruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
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
    private final DonationOrganizationRepository donationOrganizationRepository;
    private final ChallengeCommentLikeRepository challengeCommentLikeRepository;
    @Value("${property.app.upload-path}")
    private String challengeDir;
//    @Value("${kirin.stamp}")
    private final String kirinStamp = "/files/bd363c62-476d-4c29-aed6-8a5346fb41bfstamp.png";

    @Override
    public List<ChallengeDTO> listStarsByPopularity() {
        return this.challegeListToChallengDTOList(challengeRepository.findByIsOriginalAndIsProceeding(true, true, Sort.by(Sort.Direction.DESC, "likeCnt")));
    }

    @Override
    public List<ChallengeDTO> listStarsByLatest() {
        return this.challegeListToChallengDTOList(challengeRepository.findByIsOriginalAndIsProceeding(true, true, Sort.by(Sort.Direction.DESC, "id")));
    }

    @Override
    public List<ChallengeDTO> listGeneralByPopularity() {
        return this.challegeListToChallengDTOList(challengeRepository.findByIsOriginalAndIsProceeding(false, true, Sort.by(Sort.Direction.DESC, "likeCnt")));
    }

    @Override
    public List<ChallengeDTO> listGeneralByRandom() {
        List<ChallengeDTO> challenges = this.challegeListToChallengDTOList(challengeRepository.findByIsOriginalAndIsProceeding(false, true));
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<ChallengeDTO> listAllByRandom() {
        List<ChallengeDTO> challenges = this.challegeListToChallengDTOList(challengeRepository.findByIsProceeding(true));
        Collections.shuffle(challenges);
        return challenges;
    }

    @Override
    public List<ChallengeDTO> listAllByAlphabet() {
        return this.challegeListToChallengDTOList(challengeRepository.findAll(Sort.by(Sort.Direction.ASC, "title")));
    }

    @Override
    public List<ChallengeDTO> listAllByChallenge(Long challengeId) {
        return this.challegeListToChallengDTOList(challengeRepository.findByChallengeId(challengeId));
    }

    @Override
    public List<ChallengeDTO> listAllByUser(Long userId) {
        return this.challegeListToChallengDTOList(challengeRepository.findByUserId(userId));
    }

    @Override
    public List<ChallengeDTO> listUserLike(Long userId) {
        return challengeLikeRepository.findByUserId(userId).stream()
                .map(ChallengeLike::getChallenge).map(this::mapChallengeDTO).collect(Collectors.toList());
    }

    @Override
    public List<ChallengeCommentDTO> getChallengeComment(Long challengeId) {
        UserDTO userDTO = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(userDTO!=null) {
            Set<Long> set = challengeCommentLikeRepository.findByUserId(userDTO.getId()) // 본인이 좋아요 했는지 여부
                    .stream().map(ChallengeCommentLike::getChallengeCommentId).collect(Collectors.toSet());

            return challengeCommentRepository.findByChallengeId(challengeId).stream().map(o -> {
                ChallengeCommentDTO dto = ChallengeCommentMapStruct.INSTANCE.mapToChallengeCommentDTO(o);
                dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
                if(set.contains(o.getId()))dto.setLiked(true);
                return dto;
            }).collect(Collectors.toList());
        }

        return challengeCommentRepository.findByChallengeId(challengeId).stream().map(o -> {
            ChallengeCommentDTO dto = ChallengeCommentMapStruct.INSTANCE.mapToChallengeCommentDTO(o);
            dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ChallengeCommentDTO> getChallengeRecomment(Long userId, Long commentId) {
        Set<Long> set = challengeCommentLikeRepository.findByUserId(userId) // 본인이 좋아요 했는지 여부
                .stream().map(ChallengeCommentLike::getChallengeCommentId).collect(Collectors.toSet());

        return challengeCommentRepository.findByParentId(commentId).stream().map(o -> {
            ChallengeCommentDTO dto = ChallengeCommentMapStruct.INSTANCE.mapToChallengeCommentDTO(o);
            dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(o.getUser()));

            if(set.contains(o.getId())) dto.setLiked(true);

            return dto;
        }).collect(Collectors.toList());
    }


    @Override
    public void writeChallengeComment(Long userId, Long challengeId, ChallengeCommentRequestDTO dto) {
        User user = userRepository.getReferenceById(userId); // 작성자
        Challenge challenge = challengeRepository.getReferenceById(challengeId); // 챌린지

        ChallengeComment challengeComment = ChallengeComment.builder()
                                            .challengeId(challengeId)
                                            .user(user)
                                            .content(dto.content())
                                            .reg(LocalDateTime.now())
                                            .parentId(dto.parentId())
                                            .build();

        challengeCommentRepository.save(challengeComment);

        // 챌린지 게시자에게 알림
        notificationService.addNotification(Notification.builder().userId(challenge.getUser().getId())
                .event(String.format(NotificationEnum.CommentAdded.getContent(), challenge.getTitle(), user.getNickname()))
                .challenge(challenge).challengeComment(challengeComment).build());

        if (dto.parentId() != 0) { // 대댓글 등록시
            // 챌린지 내 댓글 게시자에게 알림
            Optional<ChallengeComment> tmp = challengeCommentRepository.findById(dto.parentId());
            tmp.ifPresent(comment -> notificationService.addNotification(Notification.builder().userId(comment.getUser().getId())
                    .event(String.format(NotificationEnum.CommentReplied.getContent(), user.getNickname()))
                    .challengeComment(challengeComment).challenge(challenge).build()));
            // 해당 댓글의 대댓글 게시자 모두에게 알림
            List<Long> list = challengeCommentRepository.findByParentId(dto.parentId()).stream()
                    .map(o -> o.getUser().getId()).collect(Collectors.toSet()).stream().toList();

            for (Long id : list) {
                notificationService.addNotification(Notification.builder()
                        .event(String.format(NotificationEnum.CommentReplied.getContent(), user.getNickname()))
                        .challenge(challenge).challengeComment(challengeComment).userId(id)
                        .build());
            }
        }
    }

    @Override
    public List<ChallengeSelectResponseDTO> selectChallenge() {

        return challengeRepository.findByIsOriginalAndIsProceeding(true, true, Sort.by(Sort.Direction.DESC, "id"))
                .stream().map(o -> {
                    CelebChallengeInfo celebChallengeInfo = celebChallengeInfoRepository.findByChallengeId(o.getId());
                    return new ChallengeSelectResponseDTO(o.getChallengeId(),o.getTitle(), o.getUser().getNickname(),
                            o.getUser().getProfileImg(),celebChallengeInfo.getLength(),
                            celebChallengeInfo.getMusic(), celebChallengeInfo.getMusicTitle());
                }).collect(Collectors.toList());
    }

    @Override
    public ChallengeSelectResponseDTO selectOneChallenge(Long challengeId) {
        Optional<Challenge> challenge = challengeRepository.findById(challengeId);
        if(challenge.isPresent()){
            Challenge c = challenge.get();
            CelebChallengeInfo celebChallengeInfo = celebChallengeInfoRepository.findByChallengeId(challengeId);
            return new ChallengeSelectResponseDTO(challengeId, c.getTitle(),c.getUser().getNickname() ,
                    c.getUser().getProfileImg(),celebChallengeInfo.getLength(),celebChallengeInfo.getMusic() ,celebChallengeInfo.getMusicTitle() );


        }
        return null;
    }
    @Transactional
    @Override
    public void likeChallenge(Long userId, Long challnegeId) {
        challengeLikeRepository.save(ChallengeLike.builder()
                .challenge(challengeRepository.getReferenceById(challnegeId))
                .user(userRepository.getReferenceById(userId))
                .build()
        );
    }
    @Transactional
    @Override
    public void unlikeChallenge(Long userId, Long challnegeId) {


        challengeLikeRepository.deleteByUserIdAndChallengeId(userId,challnegeId);
    }
    @Transactional
    @Override
    public void likeChallnegeComment(Long userId, Long challengeCommentId) {
        challengeCommentLikeRepository.save(ChallengeCommentLike.builder()
                                    .challengeCommentId(challengeCommentId)
                                    .user(userRepository.getReferenceById(userId))
                                    .build()
                        );
    }
    @Transactional
    @Override
    public void unlikeChallnegeComment(Long userId, Long challengeCommentId) {


        challengeCommentLikeRepository.deleteByUserIdAndChallengeCommentId(userId,challengeCommentId);
    }

    @Scheduled(initialDelay = 1000, fixedRateString = "${challenge.expiration.check-interval}")
    @Transactional
    public void scheduleChallenge() {
        // get list of expired stars' challeges
        // expire stars' challenge and expire following challeges along with notification sent
        challengeRepository.findAllById(celebChallengeInfoRepository.findByEndDateBefore(LocalDateTime.now())
                        .stream().map(o->o.getChallenge().getChallengeId())
                        .collect(Collectors.toList()))
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
    public void createChallenge(UserDTO userDTO, ChallengeRequestDTO challengeRequestDTO, MultipartFile video) throws IOException {
        try {
            StringBuilder sb = new StringBuilder();
            String line;
            System.out.println("I'm in create challenge");
            // 원 챌린지 음악과 이미지 저장경로
            Challenge forChallenge = challengeRepository.getReferenceById(challengeRequestDTO.challengeId());
            CelebChallengeInfo celebChallengeInfo = celebChallengeInfoRepository.findByChallengeId(forChallenge.getId());
            String musicPath = celebChallengeInfo.getMusic();
            User user = userRepository.getReferenceById(userDTO.getId());
            //copy video file
            String videoExt = video.getOriginalFilename().substring(video.getOriginalFilename().lastIndexOf("."));
            String videoTmpDir = challengeDir+UUID.randomUUID()+videoExt;
            Path videoTmp = Paths.get(videoTmpDir);
            Files.copy(video.getInputStream(), videoTmp);
            //make thumbnail
            String thumbDir = UUID.randomUUID()+".gif";
            String commandExtractThumbnail = String.format("ffmpeg -y -ss 2 -t 2 -i %s -r 10 -loop 0 %s", videoTmpDir,(challengeDir+thumbDir));
            Process p = Runtime.getRuntime().exec(commandExtractThumbnail);
            p.waitFor();
            // wegM to MP4
            String mp4File = UUID.randomUUID() + ".mp4";
            p=Runtime.getRuntime().exec(String.format("ffmpeg -y -i %s %s",videoTmpDir,(challengeDir+mp4File)));
            p.waitFor();
            // insert Watermark
//            String watermarkedVideo = UUID.randomUUID() + ".mp4";
//            String commandWatermark = String.format("ffmpeg -y -i %s -i %s -filter_complex [1][0]scale2ref=w=oh*mdar:h=ih*0.08[logo][video];[logo]format=argb,geq=r='r(X,Y)':a='0.8*alpha(X,Y)'[soo];[video][soo]overlay=30:30 %s",
//                    challengeDir+mp4File, kirinStamp, challengeDir+watermarkedVideo);
//            sb.append("command for watermarking video : \n" + commandWatermark+"\n");
//            sb.append(LocalDateTime.now()+"\n");
//            p= Runtime.getRuntime().exec(commandWatermark);
//            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
//            while ((line=br.readLine())!=null) sb.append(line+"\n");
//            br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
//            while ((line=br.readLine())!=null) sb.append(line+"\n");
//            sb.append("watermark inserted~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
//            sb.append(LocalDateTime.now()+"\n");
//            p.waitFor();
            // insert music
            String outputPath = UUID.randomUUID() + ".mp4";
            String commandInsertMusic = String.format("ffmpeg -y -i %s -i %s -map 0:v -map 1:a -c:v copy -shortest %s",
                    (challengeDir+mp4File),musicPath,(challengeDir+outputPath));
            sb.append("command for inserting music : \n" + commandInsertMusic+"\n");
            sb.append(LocalDateTime.now()+"\n");
            p = Runtime.getRuntime().exec(commandInsertMusic);
            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
            while ((line=br.readLine())!=null) sb.append(line+"\n");
            br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
            while ((line=br.readLine())!=null) sb.append(line+"\n");
            p.waitFor();
            sb.append("music inserted~~~~~~~~~~~~~~~`\n");
            sb.append(LocalDateTime.now());
//            String commandInsertWatermark = String.format("ffmpeg -y -i %s -i %s -i %s -filter_complex \"[1][0]scale2ref=w=oh*mdar:h=ih*0.08[logo][video];[logo]format=argb,geq=r='r(X,Y)':a='0.8*alpha(X,Y)'[soo];[video][soo]overlay=30:30\" -map \"v\" -map 2:a -c:v libx264 -crf 17 -c:a aac -strict experimental %s"
//                    , (challengeDir+mp4File), kirinStamp, musicPath, (challengeDir+outputPath));


//            p= Runtime.getRuntime().exec(commandInsertWatermark);
//            String line;
//            StringBuilder sb = new StringBuilder();
//            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
//            while ((line=br.readLine())!=null) sb.append(line+"\n");
//            br = new BufferedReader(new InputStreamReader(p.getErrorStream()));
//            while ((line=br.readLine())!=null) sb.append(line+"\n");
            System.out.println(sb.toString());
            System.out.println("saving challenge");
            challengeRepository.save(
                    Challenge.builder().user(user).isProceeding(true).reg(LocalDateTime.now()).thumbnail(thumbDir)
                               .title(challengeRequestDTO.title()).isOriginal(false).challengeId(challengeRequestDTO.challengeId())
                               .video(outputPath).build()
            );

        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
    @Transactional
    @Override
    public void createStarChallenge(UserDTO userDTO, StarChallengeRequestDTO starChallengeRequestDTO, MultipartFile video) {
        try {
            User user = userRepository.getReferenceById(userDTO.getId());
            //copy video file
            String videoExt = video.getOriginalFilename().substring(video.getOriginalFilename().lastIndexOf("."));
            String videoTmpDir = challengeDir+UUID.randomUUID()+videoExt;
            Path videoTmp = Paths.get(videoTmpDir);
            Files.copy(video.getInputStream(), videoTmp);
            //make thumbnail
            String thumbDir = UUID.randomUUID()+".gif";
            String commandExtractThumbnail = String.format("ffmpeg -y -ss 2 -t 2 -i %s -r 10 -loop 0 %s", videoTmpDir,challengeDir+thumbDir);
            Process p = Runtime.getRuntime().exec(commandExtractThumbnail);
            p.waitFor();
            //extract music
            String musicDir = UUID.randomUUID()+".ogg";
            String commandExtractMusic = String.format("ffmpeg -i %s -q:a 0 -map a %s",videoTmpDir,challengeDir+musicDir);
            p = Runtime.getRuntime().exec(commandExtractMusic);
            p.waitFor();
            // insert watermark
            String videoDir = UUID.randomUUID()+videoExt;
            String commandWatermark = String.format("ffmpeg -y -i %s -i %s -filter_complex [1][0]scale2ref=w=oh*mdar:h=ih*0.08[logo][video];[logo]format=argb,geq=r='r(X,Y)':a='0.8*alpha(X,Y)'[soo];[video][soo]overlay=30:30 %s",
                    videoTmpDir, kirinStamp, challengeDir+videoDir);
            p = Runtime.getRuntime().exec(commandWatermark);
            BufferedReader br = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            while((line =br.readLine())!=null) System.out.println(line);
            p.waitFor();
            //delete original videoFile
            Files.delete(videoTmp);

            Challenge challenge = Challenge.builder().user(user).video(videoDir)
                    .isProceeding(true).reg(LocalDateTime.now()).isOriginal(true).thumbnail(thumbDir)
                    .title(starChallengeRequestDTO.title()).build();

            challengeRepository.save(challenge);
            challenge.setChallengeId(challenge.getId());

            CelebChallengeInfo celebChallengeInfo = CelebChallengeInfo.builder().info(starChallengeRequestDTO.info()).challenge(challenge).targetAmount(starChallengeRequestDTO.targetAmount())
                    .targetNum(starChallengeRequestDTO.targetNum()).music(musicDir).musicTitle(starChallengeRequestDTO.musicTitle()).length(starChallengeRequestDTO.length())
                    .endDate(starChallengeRequestDTO.endDate()).startDate(starChallengeRequestDTO.startDate())
                    .donationOrganization(donationOrganizationRepository.getReferenceById(starChallengeRequestDTO.donationOrganizationId()))
                    .build();

            celebChallengeInfoRepository.save(celebChallengeInfo);

        }catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public ChallengeDTO mapChallengeDTO(Challenge challenge) {

        CelebChallengeInfo celebChallengeInfo = celebChallengeInfoRepository.findByChallengeId(challenge.getId());
        ChallengeDTO dto = ChallengeMapStruct.INSTANCE.mapToChallengeDTO(challenge,celebChallengeInfo);
        dto.setUser(UserMapStruct.INSTANCE.mapToUserDTO(challenge.getUser()));
        return dto;
    }

    public List<ChallengeDTO> challegeListToChallengDTOList(List<Challenge> challengeList){
        Map<Long,Long> celebChallengeInfos = celebChallengeInfoRepository.findAll().stream()
                .collect(Collectors.toMap(o->o.getChallenge().getId(),d->d.getDonationOrganization().getId()));
        Map<Long, String> donaOrganMap = donationOrganizationRepository.findAll().stream()
                .collect(Collectors.toMap(DonationOrganization::getId,DonationOrganization::getName));

        UserDTO userDTO = (UserDTO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(userDTO!=null){
            Set<Long> challengeIdSet = challengeLikeRepository.findByUserId(userDTO.getId())
                                .stream().map(o->o.getChallenge().getId())
                                .collect(Collectors.toSet());

            return challengeList.stream()
                    .map(o->{
                        ChallengeDTO dto = this.mapChallengeDTO(o);
                        if(challengeIdSet.contains(o.getId())) dto.setLiked(true);
                        dto.setDonationOrganizationName(donaOrganMap.get(celebChallengeInfos.get(o.getChallengeId())));
                        return dto;
                    })
                    .collect(Collectors.toList());

        }

        return challengeList.stream()
                .map(o->{
                        ChallengeDTO dto = this.mapChallengeDTO(o);
                        dto.setDonationOrganizationName(donaOrganMap.get(celebChallengeInfos.get(o.getChallengeId())));
                        return dto;
                })
                .collect(Collectors.toList());
    }
}
