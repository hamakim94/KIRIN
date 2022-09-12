package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.UserLoginRequestDTO;
import com.ssafy.kirin.dto.request.UserSignupRequestDTO;
import com.ssafy.kirin.entity.CelebInfo;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.repository.CelebInfoRepository;
import com.ssafy.kirin.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    private final UserRepository userRepository;
    private final CelebInfoRepository celebInfoRepository;

    public void signup(UserSignupRequestDTO userSignupRequestDTO, PasswordEncoder passwordEncoder) {
//        if (userRepository.findByEmailOrNickname(userSignupRequestDTO.getEmail(), userSignupRequestDTO.getNickname()) != null)
//            throw new Exception();

    }

    public UserDTO login(UserLoginRequestDTO userLoginRequestDTO, PasswordEncoder passwordEncoder) {
        try {
            User user = userRepository.findByEmail(userLoginRequestDTO.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User : " + userLoginRequestDTO.getEmail() + " was not found"));

            if(!user.isEmailVerified()){ // 이메일 인증이 안된 경우
                log.error("login 오류: 이메일 인증 안됨");
                return null;
            }
            else if(!userLoginRequestDTO.getPassword().equals(user.getPassword())){ // test용
                log.error("login 오류: 비밀번호 틀림");
                return null;
            }
//            else if(!passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())){ // 비밀번호가 일치하지 않는 경우
//                log.error("login 오류: 비밀번호 틀림");
//                return null;
//            }

            if(user.isCeleb()){ // 스타인 경우
                CelebInfo celebInfo = celebInfoRepository.findById(user.getCelebInfoId())
                        .orElseThrow(() -> new UsernameNotFoundException("Login Celeb info : " + user.getCelebInfoId() + " was not found"));

                return UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .nickname(user.getNickname())
                        .profileImg(user.getProfileImg())
                        .accountType(user.getAccountType())
                        .isCeleb(user.isCeleb())
                        .info(celebInfo.getInfo())
                        .coverImg(celebInfo.getCoverImg())
                        .build();
            }

            // 일반인인 경우
            return UserDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .nickname(user.getNickname())
                    .profileImg(user.getProfileImg())
                    .accountType(user.getAccountType())
                    .isCeleb(user.isCeleb())
                    .build();
        }
        catch (Exception e){
            log.error("login 오류");
            return null;
        }
    }

    @Override
    public UserDTO getUserById(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User : " + userId + " was not found"));

        if(user.isCeleb()){ // 스타인 경우
            CelebInfo celebInfo = celebInfoRepository.findById(user.getCelebInfoId())
                    .orElseThrow(() -> new UsernameNotFoundException("Login Celeb info : " + user.getCelebInfoId() + " was not found"));

            return UserDTO.builder()
                    .id(user.getId())
                    .name(user.getName())
                    .nickname(user.getNickname())
                    .profileImg(user.getProfileImg())
                    .accountType(user.getAccountType())
                    .isCeleb(user.isCeleb())
                    .info(celebInfo.getInfo())
                    .coverImg(celebInfo.getCoverImg())
                    .build();
        }

        // 일반인인 경우
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
                .accountType(user.getAccountType())
                .isCeleb(user.isCeleb())
                .build();
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findById(Long.parseLong(userId))
                .orElseThrow(() -> new UsernameNotFoundException("loadUserByUsername User : " + userId + " was not found"));

        return user;
    }

    @Transactional(readOnly = true)
    public Map<String, String> validateHandling(Errors errors){
        Map<String, String> validatorResult = new HashMap<>();

        /* 유효성 검사에 실패한 필드 목록을 받음 */
        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }

        return validatorResult;
    }
}
