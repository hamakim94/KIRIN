package com.ssafy.kirin.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TransactionDTO {
    String hash;
    String fromHash;
    String toHash;
    LocalDateTime reg;
}
