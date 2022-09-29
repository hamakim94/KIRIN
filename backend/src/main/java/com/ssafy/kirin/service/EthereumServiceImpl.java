package com.ssafy.kirin.service;

import com.ssafy.kirin.contracts.FundRaising;
import com.ssafy.kirin.contracts.IERC20;
import com.ssafy.kirin.entity.Transaction;
import com.ssafy.kirin.entity.Wallet;
import com.ssafy.kirin.repository.TransactionRepository;
import com.ssafy.kirin.repository.WalletRepository;
import com.ssafy.kirin.util.Web3jUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.ECKeyPair;
import org.web3j.crypto.Keys;
import org.web3j.crypto.WalletFile;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.response.EthGetTransactionReceipt;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.RawTransactionManager;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;
import org.web3j.tx.gas.DefaultGasProvider;
import org.web3j.utils.Convert;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.TimeZone;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class EthereumServiceImpl implements EthereumService {
    private static Web3jUtil web3jUtil = new Web3jUtil();;
    private static Web3j web3j = web3jUtil.getWeb3J();
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    @Value("${TOKENCONTRACTADDRESS}")
    private String TOKENCONTRACTADDRESS ;


    @Override
    public void createFundContract(String privatekey, int amount, BigInteger startTime, BigInteger endTime, BigInteger targetNum, String beneficiary) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(privatekey);
        TransactionManager transactionManager = new RawTransactionManager(
                web3j, credentials, 97889218, 100, 100L);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        IERC20 ierc20 = IERC20.load(TOKENCONTRACTADDRESS, web3j, transactionManager, gasProvider);
        BigInteger tokenBalance = ierc20.balanceOf(credentials.getAddress()).send();
//        if (tokenBalance.intValue()>amount){
            web3jUtil.gasCheck(credentials);
            log.info("FundRaising deploy start");
            FundRaising fundRaising = FundRaising.deploy(
                    web3j,
                    transactionManager,
                    gasProvider,
                    startTime,
                    endTime,
                    targetNum,
                    beneficiary,
                    TOKENCONTRACTADDRESS
            ).send();
        String hash = fundRaising.getTransactionReceipt().get().getTransactionHash();
        org.web3j.protocol.core.methods.response.Transaction transaction = web3j.ethGetTransactionByHash(hash).send().getResult();
        Transaction newTransaction = web3jUtil.makeTransactionEntity(transaction);
        transactionRepository.save(newTransaction);
//        System.out.println(web3j.ethGetTransactionByHash(hash).send().getResult());
            log.info("FundRaising deploy end");
            String fundContractAddress = fundRaising.getContractAddress();
            log.info("transferToken start");
//            transferToken(credentials, fundContractAddress, amount);
            log.info("transferToken end");
//        } else { throw new Exception();}
    }
    @Override
    public void addToken(String privatekey, int amount) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(privatekey);
        web3jUtil.gasCheck(credentials);
//        BigInteger gasLimit = BigInteger.valueOf(3000000);
//        BigInteger gasPrice = Convert.toWei("1", Convert.Unit.MWEI).toBigInteger();
        transferToken(web3jUtil.getAdminCredentials(), credentials.getAddress(), amount);
    }
    @Override
    public void fundToken(String fundContract, int amount, String privatekey) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(privatekey);
        web3jUtil.gasCheck((credentials));
        ContractGasProvider gasProvider = new DefaultGasProvider();
        FundRaising fundRaising = FundRaising.load(fundContract, web3j, credentials, gasProvider);
        transferToken(credentials, fundRaising.getContractAddress(), amount);
    }
    @Override
    public void withdrawToken(String fundContract, int amount, String privatekey) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(privatekey);
        web3jUtil.gasCheck((credentials));
        ContractGasProvider gasProvider = new DefaultGasProvider();
        TransactionManager transactionManager = new RawTransactionManager(web3j, credentials, 97889218, 100, 100L);
        FundRaising fundRaising = FundRaising.load(fundContract, web3j, transactionManager, gasProvider);
        TransactionReceipt transactionReceipts = fundRaising.withdrawToken().send();
        String transactionHash = transactionReceipts.getTransactionHash();
        Optional<TransactionReceipt> transactionReceipt = null;
        int i = 0;
        do {
            EthGetTransactionReceipt ethGetTransactionReceipt = web3j.ethGetTransactionReceipt(transactionHash).send();
            transactionReceipt = ethGetTransactionReceipt.getTransactionReceipt();
            Thread.sleep(1000);
            i++;
        } while (!transactionReceipt.isPresent() && i < 30);
    }

    @Override
    public Wallet createWallet() throws Exception {
        String seed = UUID.randomUUID().toString();
        ECKeyPair ecKeyPair = Keys.createEcKeyPair();
        WalletFile aWallet = org.web3j.crypto.Wallet.createLight(seed, ecKeyPair);
        String privatekey = "0x" + ecKeyPair.getPrivateKey().toString(16);
        String address = "0x" + aWallet.getAddress();
        System.out.println(privatekey);
        Wallet newWallet = Wallet.builder()
                .address(address)
                .balance(BigDecimal.ZERO)
                .cash(BigDecimal.ZERO)
                .privateKey(privatekey)
                .build();
        walletRepository.save(newWallet);
        return newWallet;
    }

    private void transferToken(Credentials fromCredentials, String toAddress, int amount) throws Exception {
        ContractGasProvider gasProvider = new DefaultGasProvider();
        TransactionManager transactionManager = new RawTransactionManager(web3j, fromCredentials, 97889218, 100, 100L);
        IERC20 ierc20 = IERC20.load(TOKENCONTRACTADDRESS, web3j, transactionManager, gasProvider);
        TransactionReceipt transactionReceipts = ierc20.transfer(toAddress, new BigInteger(String.valueOf(amount))).send();
//        String transactionHash = transactionReceipts.getTransactionHash();
//        Optional<TransactionReceipt> transactionReceipt = null;
//        int i = 0;
//        do {
//            EthGetTransactionReceipt ethGetTransactionReceipt = web3j.ethGetTransactionReceipt(transactionHash).send();
//            transactionReceipt = ethGetTransactionReceipt.getTransactionReceipt();
//            Thread.sleep(1000);
//            i++;
//        } while (!transactionReceipt.isPresent() && i < 30);
    }


}
