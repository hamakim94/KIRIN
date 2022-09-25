package com.ssafy.kirin.webhook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

@ControllerAdvice
public class GlobalControllerAdvice { // 각 controller에서 처리하지 못한 에러들을 모아서 에러를 받아줌
    @Autowired
    private NotificationManager notificationManager; // 에러가 발생한 URL과 Parameter들도 함께 받기 위해 여기서 함께 보내줌

    @ExceptionHandler(Exception.class)
    public ResponseEntity exceptionTest(Exception e, HttpServletRequest req) {
        e.printStackTrace();
        notificationManager.sendNotification(e, req.getRequestURI(), getParams(req));

        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private String getParams(HttpServletRequest req) {
        StringBuilder params = new StringBuilder();
        Enumeration<String> keys = req.getParameterNames();
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            params.append("- ").append(key).append(" : ").append(req.getParameter(key)).append('\n');
        }

        return params.toString();
    }
}
