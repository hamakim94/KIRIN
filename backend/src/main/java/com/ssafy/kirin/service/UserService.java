package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.UserFindPWRequestDTO;
import com.ssafy.kirin.dto.request.UserLoginRequestDTO;
import com.ssafy.kirin.dto.request.UserSignupRequestDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

public interface UserService {
    void signup(UserSignupRequestDTO userSignupRequestDTO, MultipartFile profileImg, MultipartFile coverImg, PasswordEncoder passwordEncoder) throws Exception;

    void confirmEmail(String email, String authToken);

    UserDTO login(UserLoginRequestDTO userLoginRequestDTO, PasswordEncoder passwordEncoder);

    UserDTO modifyUser(UserDTO userDTO, MultipartFile profileImg) throws IOException;

    UserDTO getUserById(long userId);

    void subscribe(long userId, long starId);

    List<UserDTO> getCelebList();

    List<UserDTO> getCelebListById(long userId);

    UserDTO getCelebInfo(long starId);

    boolean checkEmailDuplicate(String email);

    boolean checkNicknameDuplicate(String nickname);

    Map<String, String> validateHandling(Errors errors);

    void findPassword(String email, String name, PasswordEncoder passwordEncoder) throws Exception;

    void updatePassword(UserFindPWRequestDTO userFindPWRequestDTO, PasswordEncoder passwordEncoder) throws Exception;

    void updateCoverImg(long starId, MultipartFile coverImg);
}
