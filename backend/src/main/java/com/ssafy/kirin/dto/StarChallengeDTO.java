package com.ssafy.kirin.dto;

import com.ssafy.kirin.entity.ChallengeContract;
import com.ssafy.kirin.entity.Donation;
import lombok.*;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class StarChallengeDTO {
    public ChallengeContract challengeContract;
    public String donationHash;
}
