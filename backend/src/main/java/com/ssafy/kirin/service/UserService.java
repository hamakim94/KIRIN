package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.UserFindPWRequestDTO;
import com.ssafy.kirin.dto.request.UserLoginRequestDTO;
import com.ssafy.kirin.dto.request.UserSignupRequestDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Map;

public interface UserService {
    void signup(UserSignupRequestDTO userSignupRequestDTO, PasswordEncoder passwordEncoder) throws Exception;

    void confirmEmail(String email, String authToken);

    UserDTO login(UserLoginRequestDTO userLoginRequestDTO, PasswordEncoder passwordEncoder);

    UserDTO modifyUser(UserDTO userDTO);

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
}
