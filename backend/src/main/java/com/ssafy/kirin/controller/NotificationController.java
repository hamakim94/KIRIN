package com.ssafy.kirin.controller;

import com.ssafy.kirin.service.NotificationService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Api(value = "알림 API",tags = {"알림 API"})
@RestController
@RequestMapping("/api/notify")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping(value = "/subscribe", produces = "text/event-stream")
    public SseEmitter subscribe(@RequestParam(value = "userId") Long userId,
                                @RequestHeader(value = "Last-Event-Id", required = false, defaultValue = "") String lastEventID){


        return notificationService.subscribe(userId);
    }

    @PostMapping(value = "/read")
    public void read(@RequestParam long notificationId){
        notificationService.readNotification(notificationId);
    }

    @PostMapping(value = "/read-all")
    public void readAll(@RequestParam Long userId){

        notificationService.readAllNotification(userId);
    }

}
