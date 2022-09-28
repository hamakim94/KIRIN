package com.ssafy.kirin.controller;

import com.ssafy.kirin.service.EthereumService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Api(value = "모금 API",tags = {"모금 API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/fund")
public class FundController {
    private final EthereumService ethereumService;

    @PostMapping("/create")
    public ResponseEntity<?> createFund(@RequestParam String privatekey, int amouont, int targetNum, String beneficiary) {
        ZoneId zoneId = ZoneId.of("Asia/Seoul");
        LocalDateTime startTime = LocalDateTime.now();
        LocalDateTime endTime = startTime.plusDays(2);
        BigInteger startTimeBigInteger = BigInteger.valueOf(Timestamp.valueOf(LocalDateTime.now()).getTime());
        BigInteger endTimeBigInteger = BigInteger.valueOf(Timestamp.valueOf(LocalDateTime.now().plusDays(2)).getTime());
        log.info(startTimeBigInteger.toString());
        try {
            ethereumService.createFundContract(privatekey, amouont, startTimeBigInteger, endTimeBigInteger, BigInteger.valueOf(Long.valueOf(targetNum)), beneficiary);

        } catch (Exception e) {
            e.printStackTrace();
//            log.error(e.g);
            log.error("fund 배포 실패");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        log.info("fund 배포 성공");
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
