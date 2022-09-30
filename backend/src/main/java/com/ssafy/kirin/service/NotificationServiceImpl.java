package com.ssafy.kirin.service;

import com.ssafy.kirin.entity.Notification;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final ChallengeCommentRepository challengeCommentRepository;
    private final CommunityRepository communityRepository;
    private final CommunityCommentRepository communityCommentRepository;
    @Override
    public SseEmitter subscribe(Long userId) {
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        try {
            // 연결!!
            sseEmitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        sseEmitters.put(userId, sseEmitter);
        sseEmitter.onCompletion(() -> sseEmitters.remove(userId));
        sseEmitter.onTimeout(() -> sseEmitters.remove(userId));
        sseEmitter.onError((e) -> sseEmitters.remove(userId));

        List<Notification> list = notificationRepository.findByUserIdAndIsRead(userId, false);
        try {
            sseEmitter.send(list);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return sseEmitter;
    }


    @Override
    public void addNotification(Notification notification) {
        User user = userRepository.getReferenceById(notification.getUserId());

        notificationRepository.save(notification);

        if(sseEmitters.containsKey(user.getId())){
            SseEmitter sseEmitter = sseEmitters.get(user.getId());
            try {
                sseEmitter.send(notification);
            } catch (Exception e){
                sseEmitters.remove(user.getId());
            }
        }
    }

    @Transactional
    @Override
    public void readNotification(Long notificationId) {
        Optional<Notification> notification = notificationRepository.findById(notificationId);
        notification.ifPresent(o1 -> o1.setIsRead(true));
    }
    @Transactional
    @Override
    public void readAllNotification(Long userID) {
        List<Notification> list = notificationRepository.findByUserIdAndIsRead(userID, true);
        for(Notification notification : list)
            notification.setIsRead(true);
    }
}
