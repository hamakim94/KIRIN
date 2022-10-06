package com.ssafy.kirin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import javax.annotation.PostConstruct;
import java.util.Locale;
import java.util.TimeZone;

@EnableScheduling
@EnableAsync
@SpringBootApplication
public class BackendApplication {

	@PostConstruct
	public void started() {
		// timezone UTC 셋팅
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
		Locale.setDefault(Locale.KOREA);
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
