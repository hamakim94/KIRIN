package com.ssafy.kirin.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@DynamicInsert
@Table(name = "challenge_contract")
public class ChallengeContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Long amount;

    @Column(name = "participate_num")
    Integer participateNum;

    @Column(name = "contract_hash")
    String contractHash;

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public void setParticipateNum(Integer participateNum) {
        this.participateNum = participateNum;
    }
}
