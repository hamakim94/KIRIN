package com.ssafy.kirin.dto.request;

import com.ssafy.kirin.entity.CelebInfo;
import lombok.*;

import javax.persistence.*;
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
//    private long id;
    @NotBlank(message = "이름은 필수 입력값입니다.")
    private String name;

    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nickname;

    private String profileImg;

    @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
    private String email;

//    boolean isEmailVerified;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}", message = "비밀번호는 8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.")
    private String password;

    private Long walletId; // 나중엔 없애야함
    private Integer accountType;
    private String socialId;
    private Boolean isCeleb;
//    private CelebInfo celebInfoId;
    private String info;
    private String coverImg;
}
