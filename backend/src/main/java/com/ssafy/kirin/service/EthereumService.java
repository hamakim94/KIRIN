package com.ssafy.kirin.service;

import com.ssafy.kirin.entity.Wallet;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;

import java.math.BigInteger;
public interface EthereumService {
    void createFundContract(String privatekey, int amount, BigInteger startTime, BigInteger endTime, BigInteger targetNum, String beneficiary) throws Exception;
    void addToken(String privatekey, int amount) throws Exception;
    void fundToken(String fundContract, int amount, String privatekey) throws Exception;
    void withdrawToken(String fundContract, int amount, String privatekey) throws Exception;

    Wallet createWallet() throws Exception;
}
