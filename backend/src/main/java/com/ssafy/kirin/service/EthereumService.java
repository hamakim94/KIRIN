package com.ssafy.kirin.service;

import com.ssafy.kirin.dto.StarChallengeDTO;
import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.entity.ChallengeContract;
import com.ssafy.kirin.entity.User;
import com.ssafy.kirin.entity.Wallet;

import java.math.BigInteger;
public interface EthereumService {
    StarChallengeDTO createFundContract(User user, long amount, BigInteger startTime, BigInteger endTime, BigInteger targetNum, String beneficiary) throws Exception;
    void addToken(UserDTO user, int amount) throws Exception;
    String fundToken(User user, String fundContract, long amount) throws Exception;
    void withdrawToken(String fundContract, int amount, String privatekey) throws Exception;
    int getTokenAmount(User user) throws Exception;

    int getTokenAmount(User user, String address) throws Exception;

    int getParticipateNum(String contractAddress, User user) throws Exception;

    Wallet createWallet() throws Exception;
}
