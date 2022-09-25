package com.ssafy.kirin.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public class NotificationServiceImpl implements NotificationService {
    @Override
    public SseEmitter subscribe(Long userId, SseEmitter sseEmitter) {
        return null;
    }

    @Override
    public void sendToClient(SseEmitter emitter, String id, Object data) {

    }

    @Override
    public void send(Long userId) {

    }
}
