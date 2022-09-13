package com.ssafy.kirin.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record CommunityRequestDTO(String title, String content, MultipartFile image) {
}
