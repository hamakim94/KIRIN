package com.ssafy.kirin.dto.response;


import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CelebResponseDTO {
    Long id;
    String nickname;
    String profileImg;
    String info;
    String coverImg;
    Boolean isSubscribed;
}
