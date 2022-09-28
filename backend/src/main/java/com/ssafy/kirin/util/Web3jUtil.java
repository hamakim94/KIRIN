package com.ssafy.kirin.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.beans.factory.annotation.Value;
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
import org.web3j.utils.Convert;
import org.web3j.utils.Convert.*;
import org.web3j.utils.Numeric;

import java.io.IOException;
import java.math.BigInteger;
import java.util.Optional;
import java.util.concurrent.ScheduledExecutorService;

public class Web3jUtil {
    public final Web3j web3j = Web3j.build(new HttpService("http://j7a708.p.ssafy.io:8888"));
    @Value("${ADMIN_PRIVATE_KEY}")
    private String ADMIN_PRIVATE_KEY;
    public final Credentials adminCredentials = Credentials.create("0x6d08bfd0c97215c9e7eda22005053fa9e4a90840f2d3759d420c3dc7e7c88d4c");

//    public Web3jUtil() {
//        adminCredentials = Credentials.create(ADMIN_PRIVATE_KEY);
//    }

    public Credentials getAdminCredentials() {
        return adminCredentials;
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

        RawTransaction rawTransaction = RawTransaction.createEtherTransaction(
                nonce,
                gasPrice,
                gasLimit,
                toAddress,
                value
        );
        return Numeric.toHexString(TransactionEncoder.signMessage(rawTransaction, credentials));
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


    public void gasCheck(Credentials credentials) throws Exception {
        BigInteger balance = web3j.ethGetBalance(credentials.getAddress(), DefaultBlockParameterName.LATEST).send().getBalance();
        System.out.println("balance : "+ balance);
        if (balance.compareTo(Convert.toWei("1", Convert.Unit.MWEI).toBigInteger())<=0 ){
            String hexValue = signTransaction(adminCredentials, adminCredentials.getAddress(), credentials.getAddress(), "1000000000000000000");
            EthSendTransaction ethSendTransaction = web3j.ethSendRawTransaction(hexValue).send();
            String transactionHash = ethSendTransaction.getTransactionHash();
            //트랜잭션 정보
            Optional<TransactionReceipt> transactionReceipt = null;
//            int i = 0;
//            do {
//                EthGetTransactionReceipt ethGetTransactionReceipt = web3j.ethGetTransactionReceipt(transactionHash).send();
//                transactionReceipt = ethGetTransactionReceipt.getTransactionReceipt();
//                Thread.sleep(1000);
//                i++;
//            } while (!transactionReceipt.isPresent()&&i<30);
        }
    }


}
