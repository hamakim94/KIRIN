package com.ssafy.kirin.entity;

import com.ssafy.kirin.dto.response.ChallengeCommentDTO;
import com.ssafy.kirin.dto.response.ChallengeDTO;
import com.ssafy.kirin.dto.response.CommunityCommentDTO;
import com.ssafy.kirin.dto.response.CommunityDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Table(name = "notification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "is_read")
    Boolean isRead;

    @Column(name = "user_id")
    Long userId;

    @Column(name = "event")
    String event;

    @Column(name = "link")
    String link;

    @Column(name = "image")
    String image;
}
