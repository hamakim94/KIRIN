package com.ssafy.kirin.webhook;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class NotificationManager { // 확장성을 위해
    private Logger log = LoggerFactory.getLogger(NotificationManager.class);

    @Autowired
    private MatterMostSender mmSender; // mattermost에 메세지를 보내기 위해

    public void sendNotification(Exception e, String uri, String params) {
        log.info("#### SEND Notification");
        mmSender.sendMessage(e, uri, params);
    }

}