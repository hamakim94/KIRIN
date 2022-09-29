package com.ssafy.kirin.controller;

import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.service.EthereumService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Slf4j
@Api(value = "모금 API",tags = {"모금 API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/blockchain")
public class FundController {
    private final EthereumService ethereumService;

    @PostMapping("/charge")
    public ResponseEntity<?> chargeToken(@ApiIgnore @AuthenticationPrincipal UserDTO user, @RequestParam int amount) {
        try {
            ethereumService.addToken(user, amount);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
