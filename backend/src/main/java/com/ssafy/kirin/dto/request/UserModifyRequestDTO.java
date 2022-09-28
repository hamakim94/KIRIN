package com.ssafy.kirin.dto.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserModifyRequestDTO {
    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nickname;

    private String profileImg;
}
