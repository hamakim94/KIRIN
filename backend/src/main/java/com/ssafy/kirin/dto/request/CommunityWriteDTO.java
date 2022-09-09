package com.ssafy.kirin.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record CommunityWriteDTO(String title, String content, MultipartFile image) {
}
