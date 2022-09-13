package com.ssafy.kirin.dto;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDTO {
    private Long id;
    private String name;
    private String nickname;
    private String profileImg;
//    private String email;
//    private String password;
//    private String walletHash;
    private Integer accountType; // 있어야 되나?
//    private String socialId;
    private Boolean isCeleb;
    // star
    private String info;
    private String coverImg;
}
