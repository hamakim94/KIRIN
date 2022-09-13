package com.ssafy.kirin.dto.request;

public record CommunityCommentRequestDTO(String content, Boolean isComment, Long parentId) {
}
