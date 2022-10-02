package com.ssafy.kirin.service;

import com.fasterxml.jackson.core.io.JsonStringEncoder;
import com.google.gson.JsonObject;
import com.ssafy.kirin.entity.Notification;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.repository.*;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import springfox.documentation.spring.web.json.Json;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executor;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

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
        System.out.println(userId + " has requested subscription");
        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.execute(()->{

            sseEmitters.put(userId, sseEmitter);
            List<Notification> list = notificationRepository.findByUserIdAndIsRead(userId, false);
            try{
                sseEmitter.send(SseEmitter.event().name("connect"));
                sseEmitter.send(list);
                sseEmitter.onCompletion(() ->{
                    System.out.println("user ");
                            sseEmitters.remove(userId);
                } );
                sseEmitter.onTimeout(() -> sseEmitters.remove(userId));
                sseEmitter.onError((e) -> sseEmitters.remove(userId));

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        executor.shutdown();
        return sseEmitter;
    }


    @Override
    public void addNotification(Notification notification) {
        User user = userRepository.getReferenceById(notification.getUserId());

        notificationRepository.save(notification);
        System.out.println("Adding Notification");
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
    private void randomDelay() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
