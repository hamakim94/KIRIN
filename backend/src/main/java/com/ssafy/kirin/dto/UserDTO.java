package com.ssafy.kirin.dto;

import com.ssafy.kirin.entity.CelebInfo;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDTO {
    private long id;
    private String name;
    private String nickname;
    private String profileImg;
//    private String email;
//    private String password;
//    private String walletHash;
    private String accountType; // 있어야 되나?
//    private String socialId;
    private boolean isCeleb;
    // star
    private String info;
    private String coverImg;
}
