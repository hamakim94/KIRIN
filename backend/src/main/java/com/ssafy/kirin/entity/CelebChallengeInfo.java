package com.ssafy.kirin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "celeb_challenge_info")
public class CelebChallengeInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    @JoinColumn(name = "challenge_id")
    Challenge challenge;

    String sound;
    Integer length;

    @Column(name = "stamp_img")
    String stampImg;

    String info;

    @Column(name = "start_date")
    LocalDateTime startDate;

    @Column(name = "end_date")
    LocalDateTime endDate;

    @Column(name = "target_num")
    Integer targetNum;

    @Column(name = "target_amount")
    Integer targetAmount;

    @OneToOne
    @JoinColumn(name = "contract_id")
    ChallengeContract challengeContract;

    @ManyToOne
    @JoinColumn(name = "donation_organization_id")
    DonationOrganization donationOrganization;
}
