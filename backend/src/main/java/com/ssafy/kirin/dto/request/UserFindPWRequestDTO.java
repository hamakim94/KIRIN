package com.ssafy.kirin.dto.request;

import lombok.*;

import javax.validation.constraints.Pattern;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserFindPWRequestDTO {
    private Long userId;
    private String password;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,20}", message = "비밀번호는 8~20자 영문 대소문자, 숫자, 특수문자를 사용하세요.")
    private String newPassword;
}
