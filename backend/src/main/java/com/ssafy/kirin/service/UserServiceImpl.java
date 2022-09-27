package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.UserFindPWRequestDTO;
import com.ssafy.kirin.dto.request.UserLoginRequestDTO;
import com.ssafy.kirin.dto.request.UserSignupRequestDTO;
import com.ssafy.kirin.entity.CelebInfo;
import com.ssafy.kirin.entity.EmailAuth;
import com.ssafy.kirin.entity.Subscribe;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserDetailsService, UserService {
    private final UserRepository userRepository;
    private final CelebInfoRepository celebInfoRepository;
    private final EmailAuthRepository emailAuthRepository;
    private final EmailAuthRepositoryCustom emailAuthRepositoryCustom;
    private final EmailService emailService;
    private final SubscribeRepository subscribeRepository;

    @Value("${property.app.upload-path}")
    private String uploadPath;

    @Override
    public void signup(UserSignupRequestDTO userSignupRequestDTO, MultipartFile profileImg, MultipartFile coverImg, PasswordEncoder passwordEncoder) throws Exception {
        User user = null;

        // email, password null check && email, nickname 중복 check -> 스타, 일반인
        if(userSignupRequestDTO.getEmail() == null || userSignupRequestDTO.getPassword() == null){ // email, password null check
            log.info("email, password null");
            throw new Exception();
        }

        if(userRepository.existsByEmail(userSignupRequestDTO.getEmail()) || userRepository.existsByNickname(userSignupRequestDTO.getNickname())){ // email,nickname 중복 check
            log.info("email, nickname 중복");
            throw new Exception();
        }

        userSignupRequestDTO.setPassword(passwordEncoder.encode(userSignupRequestDTO.getPassword()));

        if(userSignupRequestDTO.getIsCeleb()){ // 스타일 경우
            log.info("스타 회원가입");
            System.out.println("회원가입 userSignupRequestDTO: " + userSignupRequestDTO);

            CelebInfo celebInfo = CelebInfo.builder()
                    .coverImg(getFilePath(coverImg))
                    .info(userSignupRequestDTO.getInfo())
                    .build();

            // wallet 만들어서 넣어줘야됨.

            user = User.builder()
                    .name(userSignupRequestDTO.getName())
                    .nickname(userSignupRequestDTO.getNickname())
                    .profileImg(getFilePath(profileImg)) // null일수도
                    .email(userSignupRequestDTO.getEmail())
                    .password(userSignupRequestDTO.getPassword())
                    .isCeleb(userSignupRequestDTO.getIsCeleb())
                    .reg(LocalDateTime.now())
                    .build();

            user.setCelebInfo(celebInfoRepository.save(celebInfo));

            System.out.println(4);
        } else { // 일반인인 경우
            log.info("일반인 회원가입");
            System.out.println("회원가입 userSignupRequestDTO: " + userSignupRequestDTO);

            // wallet 만들어서 넣어줘야됨.

            user = User.builder()
                    .name(userSignupRequestDTO.getName())
                    .nickname(userSignupRequestDTO.getNickname())
                    .profileImg(getFilePath(profileImg)) // null일수도
                    .email(userSignupRequestDTO.getEmail())
                    .password(userSignupRequestDTO.getPassword())
                    .isCeleb(userSignupRequestDTO.getIsCeleb())
                    .reg(LocalDateTime.now())
                    .build();
        }
        userRepository.save(user);

        // 이메일 verify 확인
        EmailAuth emailAuth = emailAuthRepository.save(
                new EmailAuth(userSignupRequestDTO.getEmail(), UUID.randomUUID().toString(), false)
        );

        emailService.sendVerifyMail(emailAuth.getEmail(), emailAuth.getAuthToken()); // 이메일 인증 메일 보내기
    }

    @Override
    public void confirmEmail(String email, String authToken) {
        EmailAuth emailAuth = emailAuthRepositoryCustom.findValidAuthByEmail(email, authToken, LocalDateTime.now())
                .orElseThrow(() -> new NoSuchElementException("EmailAuth : " + email + " was not found"));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User : " + email + " was not found"));
        emailAuth.useToken();
        user.emailVerifiedSuccess();
        emailAuthRepository.save(emailAuth);
        userRepository.save(user);
    }

    @Override
    public UserDTO login(UserLoginRequestDTO userLoginRequestDTO, PasswordEncoder passwordEncoder) {
        User user = userRepository.findByEmail(userLoginRequestDTO.getEmail())
                .orElseThrow(() -> new NoSuchElementException("User : " + userLoginRequestDTO.getEmail() + " was not found"));

        if(!user.getIsEmailVerified()){ // 이메일 인증이 안된 경우
            log.error("login 오류: 이메일 인증 안됨");
            return null;
        }

        if(user.getIsCeleb() && !user.getIsCelebVerified()){ // 스타 계정이지만 스타 인증이 안된 경우
            log.error("login 오류: 스타 인증 안됨");
            return null;
        }

        if(!passwordEncoder.matches(userLoginRequestDTO.getPassword(), user.getPassword())){ // 비밀번호가 일치하지 않는 경우
            log.error("login 오류: 비밀번호 틀림");
            return null;
        }

        return userToUserDto(user); // 일반인인 경우, 스타인 경우 모두 포함
    }

    @Override
    public UserDTO modifyUser(UserDTO userDTO, MultipartFile profileImg) {
        User user = userRepository.findById(userDTO.getId())
                .orElseThrow(() -> new NoSuchElementException("User : " + userDTO.getId() + " was not found"));

        // 원래 profile 사진은 지우기
        deleteFile(userDTO.getProfileImg());

        user.setProfileImgAndNickname(getFilePath(profileImg), userDTO.getNickname());

        if(user.getIsCeleb()){ // 스타인 경우, celebInfo update
            user.getCelebInfo().setInfo(userDTO.getInfo());
            celebInfoRepository.save(user.getCelebInfo());
        }

        userRepository.save(user); // user update

        return userToUserDto(user);
    }

    @Override
    public UserDTO getUserById(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User : " + userId + " was not found"));

        return userToUserDto(user);
    }

    @Override
    public void subscribe(long userId, long celebId) {
        User celeb = userRepository.getReferenceById(celebId);

        Subscribe subscribe = Subscribe.builder()
                .userId(userId)
                .celeb(celeb)
                .build();

        subscribeRepository.save(subscribe);
    }

    @Override
    public List<UserDTO> getCelebList() {
        List<User> users = userRepository.findByIsCeleb(true);
        List<UserDTO> result = new ArrayList<>();

        for(User user: users){
            result.add(userToUserDto(user));
        }

        return result;
    }

    @Override
    public List<UserDTO> getCelebListById(long userId) {
        List<Subscribe> subscribes = subscribeRepository.findByUserId(userId);
        List<UserDTO> result = new ArrayList<>();

        for(Subscribe subscribe: subscribes){
            UserDTO userDTO = userToUserDto(subscribe.getCeleb());
            result.add(userDTO);
        }

        return result;
    }

    @Override
    public UserDTO getCelebInfo(long starId) {
        User user = userRepository.findById(starId)
                .orElseThrow(() -> new NoSuchElementException("Star : " + starId + " was not found"));

        if(!user.getIsCeleb()){
            log.error("스타가 아님");
            return null;
        }

        return userToUserDto(user);
    }

    @Override
    public boolean checkEmailDuplicate(String email) {
        boolean isEmailDupliated = userRepository.existsByEmail(email);

        if(isEmailDupliated) return false;

        return true;
    }

    @Override
    public boolean checkNicknameDuplicate(String nickname) {
        boolean isNicknameDupliated = userRepository.existsByNickname(nickname);

        if(isNicknameDupliated) return false;

        return true;
    }

    @Override
    public UserDTO loadUserByUsername(String userId) throws UsernameNotFoundException {
        UserDTO userDTO = getUserById(Long.parseLong(userId));
        // 일반인, 스타 role 지정

        return userDTO;
    }

    @Transactional(readOnly = true)
    public Map<String, String> validateHandling(Errors errors){
        Map<String, String> validatorResult = new HashMap<>();

        // 유효성 검사에 실패한 필드 목록을 받음
        for (FieldError error : errors.getFieldErrors()) {
            String validKeyName = String.format("valid_%s", error.getField());
            validatorResult.put(validKeyName, error.getDefaultMessage());
        }

        return validatorResult;
    }

    @Override
    public void findPassword(String email, String name, PasswordEncoder passwordEncoder) throws Exception {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NoSuchElementException("해당 이메일을 가진 사용자가 존재하지 않습니다."));

        if(user.getName().equals(name)){
            String newPassword = getRamdomPassword(10);
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            emailService.sendNewPasswordMail(email, newPassword);
        } else {
            throw new Exception("사용자 이름이 일치하지 않습니다.");
        }
    }

    @Override
    public void updatePassword(UserFindPWRequestDTO userFindPWRequestDTO, PasswordEncoder passwordEncoder) throws Exception {
        User user = userRepository.findById(userFindPWRequestDTO.getUserId())
                .orElseThrow(() -> new NoSuchElementException("User : " + userFindPWRequestDTO.getUserId() + " was not found"));;

        if(passwordEncoder.matches(userFindPWRequestDTO.getPassword(), user.getPassword())){
            user.setPassword(passwordEncoder.encode(userFindPWRequestDTO.getNewPassword()));
            userRepository.save(user);
        } else {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }
    }

    @Override
    public void updateCoverImg(long starId, MultipartFile coverImg) {
        User user = userRepository.findById(starId)
                .orElseThrow(() -> new NoSuchElementException("Star : " + starId + " was not found"));;

        CelebInfo celebInfo = user.getCelebInfo();

        // 원래 파일 지워야
        deleteFile(celebInfo.getCoverImg());

        celebInfo.setCoverImg(getFilePath(coverImg));

        celebInfoRepository.save(celebInfo);
    }

    private UserDTO userToUserDto(User user){
        System.out.println("userToUserDto");

        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .profileImg(user.getProfileImg())
//                .accountType(user.getAccountType())
                .isCeleb(user.getIsCeleb())
                .info(user.getCelebInfo() != null ? user.getCelebInfo().getInfo() : null)
                .coverImg(user.getCelebInfo() != null ? user.getCelebInfo().getCoverImg() : null)
                .build();
    }

    private String getFilePath(MultipartFile file) { // file을 docker volume에 저장하고, 경로+파일명 return
        if(file != null && !file.isEmpty()) {
            System.out.println("file 들어옴");
            try{
                // 파일 디렉토리 + UUID + 확장자로 Path 설정
                String fileName = UUID.randomUUID() + file.getOriginalFilename();
                Path dir = Paths.get(uploadPath + fileName);

                // 지정된 디렉토리에 저장
                Files.copy(file.getInputStream(), dir);

                return fileName;
            } catch (Exception e){
                log.error("getFilePath error: ", e);
            }
        }

        log.error("file이 존재하지 않음");
        return null;
    }

    private void deleteFile(String fileDir) {
        if(fileDir != null){
            try {
                Path filePath = Paths.get(fileDir);
                Files.delete(filePath);
            } catch (Exception e){
                log.error("파일 삭제 실패: ", e);
            }
        }
    }

    public static String getRamdomPassword(int size) {
        char[] charSet1 = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
        char[] charSet2 = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'};
        char[] charSet3 = {'!', '@', '#', '$', '%', '^', '&' };

        StringBuffer sb = new StringBuffer();
        SecureRandom sr = new SecureRandom();
        sr.setSeed(new Date().getTime());

        int idx = 0;
        int len = charSet1.length;
        int size1 = sr.nextInt(size-2)+1;
        size-=size1;
        for (int i=0; i<size1; i++) {
            idx = sr.nextInt(len);
            sb.append(charSet1[idx]);
        }
        len = charSet2.length;
        size1 = sr.nextInt(size-1)+1;
        size-=size1;
        for (int i=0; i<size1; i++) {
            idx = sr.nextInt(len);
            sb.append(charSet2[idx]);
        }
        len = charSet3.length;
        for (int i=0; i<size; i++) {
            idx = sr.nextInt(len);
            sb.append(charSet3[idx]);
        }
        List<String> list = Arrays.asList(sb.toString().split(""));
        Collections.shuffle(list);
        sb = new StringBuffer();
        for (int i=0, n = list.size(); i<n; i++){
            sb.append(list.get(i));
        }
        return sb.toString();
    }
}
