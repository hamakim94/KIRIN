package com.ssafy.kirin.dto.request;

import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class EmailAuthRequestDTO {
//    private long id;
    private String email;
    private String authToken;
}
