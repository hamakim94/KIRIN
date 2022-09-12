package com.ssafy.kirin.dto.request;

public record CommunityCommentWriteDTO(String content, boolean isComment, Long parentId) {
}
