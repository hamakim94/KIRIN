package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.ChallengeRequestDTO;
import com.ssafy.kirin.dto.request.ChallengeCommentRequestDTO;
import com.ssafy.kirin.dto.request.StarChallengeRequestDTO;
import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.dto.response.ChallengeDTO;
import com.ssafy.kirin.dto.response.ChallengeSelectResponseDTO;
import com.ssafy.kirin.entity.Challenge;
import com.ssafy.kirin.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ChallengeService {
    List<Challenge> listStarsByPopularity();
    List<Challenge> listStarsByLatest();
    List<Challenge> listGeneralByPopularity();
    List<Challenge> listGeneralByRandom();
    List<Challenge> listAllByRandom();
    List<Challenge> listAllByAlphabet();
    List<Challenge> listAllByChallenge(Long challengeId);
    List<Challenge> listAllByUser(Long userId);
    List<ChallengeDTO> listUserLike(Long userId);
    void createChallenge(UserDTO userDTO, ChallengeRequestDTO challengeRequestDTO, MultipartFile video) throws IOException;
    void createStarChallenge(UserDTO userDTO, StarChallengeRequestDTO starChallengeRequestDTO, MultipartFile video);
    List<ChallengeCommentDTO> getChallengeComment(Long challengeId);
    void writeChallengeComment(Long userId, Long challengeId,
                               ChallengeCommentRequestDTO challengeCommentRequestDTO);
    List<ChallengeSelectResponseDTO> selectChallenge();

    ChallengeSelectResponseDTO selectOneChallenge(Long challengeId);
}
