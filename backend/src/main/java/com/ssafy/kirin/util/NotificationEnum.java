package com.ssafy.kirin.util;

import com.ssafy.kirin.entity.Challenge;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum NotificationEnum {

    ChallengeUpload("ChallegeUpload","%s님이 %s 챌린지를 등록하였습니다!"),
    ChallengeEnd("ChallengeEnd","%s 챌린지가 종료되었습니다!"),
    CommentReplied("CommentReplied","%s님이 대댓글을 달았습니다"),
    CommentAdded("CommentAdded","%s 챌린지에 %s님이 댓글을 달았습니다");

    private final String category;
    private final String content;
    public String getCategory(){
        return category;
    }
    public String getContent(){
        return content;
    }
}
