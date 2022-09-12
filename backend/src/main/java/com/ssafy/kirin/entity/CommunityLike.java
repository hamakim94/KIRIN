package com.ssafy.kirin.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "community_like")
public class CommunityLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne
    @JoinColumn(name = "community_id")
    Community community;

    @Column(name = "community_id")
    long communityId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Column(name = "user_id")
    long userId;
}
