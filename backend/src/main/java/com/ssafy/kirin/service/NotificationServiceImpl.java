package com.ssafy.kirin.service;

import com.google.gson.*;
import com.ssafy.kirin.entity.Notification;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.repository.*;
import com.ssafy.kirin.util.HibernateProxyTypeAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
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

    @Transactional
    @Override
    public void addNotification(Notification notification) {
        User user = userRepository.getReferenceById(notification.getUserId());

        notificationRepository.save(notification);
        if(sseEmitters.containsKey(user.getId())){
            SseEmitter sseEmitter = sseEmitters.get(user.getId());
            try {
                Gson gson = new GsonBuilder().
                        registerTypeAdapterFactory(HibernateProxyTypeAdapter.FACTORY).registerTypeAdapter(LocalDateTime.class, new JsonSerializer<LocalDateTime>() {
                    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
                    @Override
                    public JsonElement serialize(LocalDateTime src, Type typeOfSrc, JsonSerializationContext context) {
                        return new JsonPrimitive(formatter.format(src));
                    }
                }).create();
                sseEmitter.send(gson.toJson(notification));
            } catch (Exception e){
                e.printStackTrace();
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
        List<Notification> list = notificationRepository.findByUserIdAndIsRead(userID, false);
        for(Notification notification : list)
            notification.setIsRead(true);
    }
}
