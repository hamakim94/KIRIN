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

    Integer amount;

    @Column(name = "contract_hash")
    String contractHash;

    @ManyToOne
    @JoinColumn(name = "donation_organization_id")
    DonationOrganization donationOrganization;
}
