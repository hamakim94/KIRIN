package com.ssafy.kirin.dto.request;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserLoginRequestDTO {
    private String email;
    private String password;
//    private String accessToken;
//    private String refreshToken;
}
