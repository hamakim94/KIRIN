package com.ssafy.kirin.dto.response;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserResponseDTO {
    Long id;
    String nickname;
    String profileImg;

    @Getter
    @Setter
    @Builder
    public class CelebResponseDTO{
        String info;
        String coverImg;
        Boolean isCeleb;
    }
}
