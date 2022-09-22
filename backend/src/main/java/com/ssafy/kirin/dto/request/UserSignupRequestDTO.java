package com.ssafy.kirin.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserSignupRequestDTO { // 회원가입
    @NotBlank(message = "이름은 필수 입력값입니다.")
    private String name;

    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nickname;

//    private String profileImg; // 이미지 경로

    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
    private String email;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}", message = "비밀번호는 8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.")
    private String password;

    private Long walletId; // 나중엔 없애야함
//    private Integer accountType; // 0: 일반, 1: 소셜
//    private String socialId;
    private Boolean isCeleb;
    private String info;
//    private String coverImg; // 이미지 경로
}
