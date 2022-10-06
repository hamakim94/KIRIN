package com.ssafy.kirin.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.kirin.dto.response.MyChallengeResponseDTO;
import com.ssafy.kirin.entity.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ChallengeRepositoryCustomImpl implements ChallengeRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;

    QChallenge c = new QChallenge("c");
    QDonation d = QDonation.donation;
    QCelebChallengeInfo ci = QCelebChallengeInfo.celebChallengeInfo;
    QChallenge c2 = new QChallenge("c2");
    QUser u = QUser.user;
    QDonationOrganization org = QDonationOrganization.donationOrganization;
    QChallengeContract cc = QChallengeContract.challengeContract;

    @Override
    public List<MyChallengeResponseDTO> findMyChallengesByUserId(long userId) {
        List<Tuple> tuples = jpaQueryFactory.select(c.id, c2.title, u.id, u.name, u.nickname, u.profileImg, org.id, org.name, d.id, d.amount, ci.targetNum, ci.targetAmount, cc.amount, cc.participateNum, c.isProceeding)
                .from(c)
                .leftJoin(d)
                .on(c.id.eq(d.challenge.id))
                .leftJoin(ci)
                .on(c.challengeId.eq(ci.challenge.id))
                .leftJoin(c2)
                .on(c.challengeId.eq(c2.id))
                .leftJoin(u)
                .on(c2.user.id.eq(u.id))
                .leftJoin(org)
                .on(ci.donationOrganization.id.eq(org.id))
                .leftJoin(cc)
                .on(ci.challengeContract.id.eq(cc.id))
                .where(c.user.id.eq(userId))
                .fetch();

        List<MyChallengeResponseDTO> myChallengeResponseDTOList = new ArrayList<>();

        for(Tuple t: tuples){
            MyChallengeResponseDTO myChallengeResponseDTO = MyChallengeResponseDTO.builder()
                    .id(t.get(c.id))
                    .title(t.get(c2.title))
                    .starId(t.get(u.id))
                    .starName(t.get(u.name))
                    .starNickname(t.get(u.nickname))
                    .starProfile(t.get(u.profileImg))
                    .starChallengeId(t.get(c.challengeId))
                    .isProceeding(t.get(c.isProceeding))
                    .targetNum(t.get(ci.targetNum))
                    .targetAmount(t.get(ci.targetAmount))
                    .currentNum(t.get(cc.participateNum))
                    .currentAmount(t.get(cc.amount))
                    .donationOrganizationId(t.get(org.id))
                    .donationOrganizationName((t.get(org.name)))
                    .myDonation(t.get(d.amount))
                    .build();

            myChallengeResponseDTOList.add(myChallengeResponseDTO);
        }

        return myChallengeResponseDTOList;
    }
}
