package com.ssafy.kirin.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@EnableAsync
@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService{
    private final JavaMailSender javaMailSender;

    @Async
    @Override
    public void sendVerifyMail(String email, String authToken) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email); // 누구에게 보낼지
        message.setSubject("[기린: 기부 챌린지] 회원가입 이메일 인증"); // 제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 '기린: 기부 챌린지'입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>회원가입 완료를 위해 아래 링크를 눌러주세요<p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다!<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:black;'>회원가입 인증 링크</h3>";
        msgg+= "<div style='font-size:130%'>";
        String link = String.format("<strong><a href='http://j7a708.p.ssafy.io:8999/api/users/confirm-email?email=%s&authToken=%s'>인증하기</a>", email, authToken);
        msgg+= link;
        msgg+= "</strong><div><br/> ";
        msgg+= "</div>";

        message.setText(msgg, "utf-8", "html"); //내용
        message.setFrom(new InternetAddress("noning2025@gmail.com","기린")); // 보내는 사람

        javaMailSender.send(message);
    }

    @Override
    public void sendNewPasswordMail(String email, String newPassword) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, email);  // 누구에게 보낼지
        message.setSubject("[기린: 기부 챌린지] 임시 비밀번호 발급 안내"); // 제목

        String msgg="";
        msgg+= "<div style='margin:100px;'>";
        msgg+= "<h1> 안녕하세요 '기린: 기부 챌린지'입니다. </h1>";
        msgg+= "<br>";
        msgg+= "<p>새로운 임시 비밀번호를 발급해드렸습니다.<p>";
        msgg+= "<br>";
        msgg+= "<p>보안을 위해 접속 후 반드시 비밀번호를 변경해 주세요. <p>";
        msgg+= "<br>";
        msgg+= "<p>감사합니다.<p>";
        msgg+= "<br>";
        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgg+= "<h3 style='color:black;'>임시 비밀번호</h3>";
        msgg+= "<div style='font-size:130%'>";
        String link = String.format("<strong>%s", newPassword);
        msgg+= link;
        msgg+= "</strong><div><br/> ";
        msgg+= "</div>";

        message.setText(msgg, "utf-8", "html"); //내용
        message.setFrom(new InternetAddress("noning2025@gmail.com","기린")); // 보내는 사람

        javaMailSender.send(message);
    }
}
