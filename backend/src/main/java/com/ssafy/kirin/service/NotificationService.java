package com.ssafy.kirin.service;

import com.ssafy.kirin.entity.Notification;
import com.ssafy.kirin.util.NotificationEnum;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
    SseEmitter subscribe(Long userId);
    void addNotification(Notification notification);
    void readNotification(Long notificationId);
    void readAllNotification(Long userID);
}