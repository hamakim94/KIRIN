package com.ssafy.kirin.dto.request;

public record ChallengeCommentRequestDTO(String content, Boolean isComment, Long parentId) {
}
