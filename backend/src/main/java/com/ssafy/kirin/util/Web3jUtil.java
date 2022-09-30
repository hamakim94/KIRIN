package com.ssafy.kirin.util;

import com.ssafy.kirin.entity.Transaction;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.Transfer;
import org.web3j.utils.Convert;
import org.web3j.utils.Convert.*;
import org.web3j.utils.Numeric;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.TimeZone;
import java.util.concurrent.ScheduledExecutorService;

@Service
public class Web3jUtil {
    public final Web3j web3j = Web3j.build(new HttpService("http://j7a708.p.ssafy.io:8888"));
//    @Value("${ADMIN_PRIVATE_KEY}")
    private String ADMIN_PRIVATE_KEY;

//    public Web3jUtil() {}
//
    public Web3jUtil(@Value("${ADMIN_PRIVATE_KEY}") String privatekey) {
        ADMIN_PRIVATE_KEY = privatekey;
    }

    public Credentials getAdminCredentials(String adminPrivatekey) {
        return Credentials.create(adminPrivatekey);
    }

    public Web3j getWeb3J() {
        return web3j;
    }
    public Credentials getCredentials(String privateKey) {
        return Credentials.create(privateKey);
    }

    public String signTransaction(Credentials credentials, String fromAddress, String toAddress, String valueString ) throws Exception{
        EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(fromAddress, DefaultBlockParameterName.LATEST).send();
        BigInteger nonce = ethGetTransactionCount.getTransactionCount();
        BigInteger value = Convert.toWei(valueString, Unit.ETHER).toBigInteger();
        BigInteger gasLimit = BigInteger.valueOf(3000000);
        BigInteger gasPrice = Convert.toWei("1", Unit.GWEI).toBigInteger();
        TransactionManager transactionManager = new RawTransactionManager(web3j, credentials, 97889218, 100, 100L);
        RawTransaction rawTransaction = RawTransaction.createEtherTransaction(
                nonce,
                gasPrice,
                gasLimit,
                toAddress,
                value
        );
        return Numeric.toHexString(TransactionEncoder.signMessage(rawTransaction, 97889218, credentials));
    }

    public String signTransaction(Credentials credentials, String fromAddress, String toAddress, String valueString, String data ) throws Exception{
        EthGetTransactionCount ethGetTransactionCount = web3j.ethGetTransactionCount(fromAddress, DefaultBlockParameterName.LATEST).send();
        BigInteger nonce = ethGetTransactionCount.getTransactionCount();
        BigInteger value = Convert.toWei(valueString, Unit.ETHER).toBigInteger();
        BigInteger gasLimit = BigInteger.valueOf(3000000);
        BigInteger gasPrice = Convert.toWei("1", Unit.GWEI).toBigInteger();

        RawTransaction rawTransaction = RawTransaction.createTransaction(
                nonce,
                gasPrice,
                gasLimit,
                toAddress,
                value,
                data
        );
        return Numeric.toHexString(TransactionEncoder.signMessage(rawTransaction, credentials));
    }

    public String deployContract() {
        return null;
    }


    public Transaction gasCheck(Credentials credentials) throws Exception {
        BigInteger balance = web3j.ethGetBalance(credentials.getAddress(), DefaultBlockParameterName.LATEST).send().getBalance();
        System.out.println("balance : "+ balance);
        Transaction newTransaction = null;
        if (balance.compareTo(Convert.toWei("1", Convert.Unit.GWEI).toBigInteger())<=0 ){
            System.out.println(ADMIN_PRIVATE_KEY);
            TransactionManager transactionManager = new RawTransactionManager(web3j, Credentials.create(ADMIN_PRIVATE_KEY), 97889218, 100, 100L);
            Transfer transfer = new Transfer(web3j, transactionManager);
            String hash =  transfer.sendFunds(credentials.getAddress(), BigDecimal.valueOf(1.0), Unit.ETHER).send().getTransactionHash();
            newTransaction = makeTransactionEntity(web3j.ethGetTransactionByHash(hash).send().getResult());

//            String hexValue = signTransaction(adminCredentials, adminCredentials.getAddress(), credentials.getAddress(), "1000000000000000000");
//            EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();
//            String transactionHash = ethSendTransaction.getTransactionHash();
//            //트랜잭션 정보
//            Optional<TransactionReceipt> transactionReceipt = null;
//            int i = 0;
//            do {
//                EthGetTransactionReceipt ethGetTransactionReceipt = web3j.ethGetTransactionReceipt(transactionHash).send();
//                transactionReceipt = ethGetTransactionReceipt.getTransactionReceipt();
//                Thread.sleep(1000);
//                i++;
//            } while (!transactionReceipt.isPresent()&&i<30);
        }
        return newTransaction;
    }

    public Transaction makeTransactionEntity(org.web3j.protocol.core.methods.response.Transaction transaction) throws IOException {
        Transaction newTransaction = Transaction.builder()
                .hash(transaction.getHash())
                .nonce(transaction.getNonceRaw())
                .blockHash(transaction.getBlockHash())
                .blockNumber(transaction.getBlockNumberRaw())
                .transactionIndex(transaction.getTransactionIndexRaw())
                .fromHash(transaction.getFrom())
                .toHash(transaction.getTo())
                .value(transaction.getValueRaw())
                .gasPrice(transaction.getGasPriceRaw())
                .gas(transaction.getGasRaw())
                .input(transaction.getInput())
                .creates(transaction.getCreates())
                .publicKey(transaction.getPublicKey())
                .r(transaction.getR())
                .s(transaction.getS())
                .v((int)transaction.getV())
                .reg(LocalDateTime.ofInstant(Instant.ofEpochMilli( web3j.ethGetBlockByHash(transaction.getBlockHash(), false).send().getResult().getTimestamp().longValue()*1000L), TimeZone.getDefault().toZoneId()))
                .build();

        return newTransaction;
    }


}
