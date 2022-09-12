package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.UserLoginRequestDTO;
import com.ssafy.kirin.dto.request.UserSignupRequestDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;

import java.util.Map;

public interface UserService {
    void signup(UserSignupRequestDTO userSignupRequestDTO, PasswordEncoder passwordEncoder);

    UserDTO login(UserLoginRequestDTO userLoginRequestDTO, PasswordEncoder passwordEncoder);

    UserDTO getUserById(long userId);

    Map<String, String> validateHandling(Errors errors);
}
