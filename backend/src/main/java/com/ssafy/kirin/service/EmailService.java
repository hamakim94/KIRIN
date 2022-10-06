package com.ssafy.kirin.service;

import org.springframework.scheduling.annotation.Async;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    @Async
    void sendVerifyMail(String email, String authToken) throws MessagingException, UnsupportedEncodingException;

    @Async
    void sendNewPasswordMail(String email, String newPassword) throws MessagingException, UnsupportedEncodingException;
}
