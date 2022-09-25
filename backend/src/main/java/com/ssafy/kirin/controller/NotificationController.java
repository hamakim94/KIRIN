package com.ssafy.kirin.controller;

import com.ssafy.kirin.service.NotificationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Api(value = "알림 API",tags = {"알림 API"})
@RestController
@MessageMapping("sse/subscribe")
@RequiredArgsConstructor
public class NotificationController {

    private NotificationService notificationService;
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    @GetMapping(value = "/{id}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable(value = "id") Long userId,
                                @RequestHeader(value = "Last-Event-Id", required = false, defaultValue = "") String lastEventID){

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


        return notificationService.subscribe(userId, sseEmitter);
    }

}
