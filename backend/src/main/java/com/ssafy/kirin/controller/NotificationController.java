package com.ssafy.kirin.controller;

import com.ssafy.kirin.service.NotificationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Api(value = "알림 API",tags = {"알림 API"})
@RestController
@MessageMapping("sse/subscribe")
@RequiredArgsConstructor
public class NotificationController {

    private NotificationService notificationService;

    @GetMapping(value = "/{id}", produces = "text/event-stream")
    public SseEmitter subscribe(@PathVariable Long id,
                                @RequestHeader(value = "Last-Event-Id", required = false, defaultValue = "") String lastEventID){

        return notificationService.subscribe(id, lastEventID);
    }

}
