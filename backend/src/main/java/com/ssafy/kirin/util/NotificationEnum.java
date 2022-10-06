package com.ssafy.kirin.util;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum NotificationEnum {

    ChallengeUpload("ChallegeUpload","%s님이 %s 챌린지를 등록하였습니다!"),
    ChallengeEnd("ChallengeEnd","%s 챌린지가 종료되었습니다!"),
    CommentReplied("CommentReplied","%s님이 대댓글을 달았습니다."),
    ChallengeCommentAdded("CommentAdded","%s 챌린지에 %s님이 댓글을 달았습니다."),
    CommunityUpload("CommunityUpload","%s님이 커뮤니티를 등록했습니다."),
    ChallengeUploadCompleted("ChallengeUploadCompleted", "%s 챌린지가 정상적으로 업로드 되었습니다."),
    ChallengeUploadFailed("ChallengeUploadFailed", "%s 챌린지 업로드가 실패했어요ㅠㅠ");

    private final String category;
    private final String content;
    public String getCategory(){
        return category;
    }
    public String getContent(){
        return content;
    }
}
