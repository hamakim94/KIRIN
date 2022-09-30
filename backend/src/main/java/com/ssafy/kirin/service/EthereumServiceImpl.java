package com.ssafy.kirin.service;

import com.ssafy.kirin.contracts.ERC20;
import com.ssafy.kirin.contracts.FundRaising;
import com.ssafy.kirin.contracts.IERC20;
import com.ssafy.kirin.dto.StarChallengeDTO;
import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.response.TransactionDTO;
import com.ssafy.kirin.entity.*;
import com.ssafy.kirin.repository.DonationRepository;
import com.ssafy.kirin.repository.TransactionRepository;
import com.ssafy.kirin.repository.UserRepository;
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

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
//@RequiredArgsConstructor
@Service
public class EthereumServiceImpl implements EthereumService {
    private final Web3jUtil web3jUtil;;
    private Web3j web3j;
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    @Value("${TOKENCONTRACTADDRESS}")
    private String TOKENCONTRACTADDRESS ;
    @Value("${ADMIN_PRIVATE_KEY}")
    private String ADMIN_PRIVATE_KEY;

    public EthereumServiceImpl(Web3jUtil web3jUtil, WalletRepository walletRepository, TransactionRepository transactionRepository, UserRepository userRepository, DonationRepository donationRepository) {
        this.web3jUtil = web3jUtil;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
        web3j = web3jUtil.getWeb3J();
    }

    @Override
    public StarChallengeDTO createFundContract(User user, long amount, BigInteger startTime, BigInteger endTime, BigInteger targetNum, String beneficiary) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(user.getWallet().getPrivateKey());
        TransactionManager transactionManager = new RawTransactionManager(
                web3j, credentials, 97889218, 300, 100L);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        IERC20 ierc20 = IERC20.load(TOKENCONTRACTADDRESS, web3j, transactionManager, gasProvider);
        BigInteger tokenBalance = ierc20.balanceOf(credentials.getAddress()).send();
        if (tokenBalance.intValue()>amount){
            gasCheck(credentials);
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
            log.info("FundRaising deploy end");
            String fundContractAddress = fundRaising.getContractAddress();
            log.info("transferToken start");

            Transaction transferTransaction = transferToken(credentials, fundContractAddress, amount);
            transactionRepository.save(transferTransaction);
            user.getWallet().setCash(getTokenAmount(user));
            walletRepository.save(user.getWallet());
            log.info("transferToken end");

            ChallengeContract challengeContract = ChallengeContract.builder()
                    .amount((long)amount)
                    .participateNum(0)
                    .contractHash(fundContractAddress)
                    .build();
            StarChallengeDTO starChallengeDTO = StarChallengeDTO.builder()
                    .challengeContract(challengeContract)
                    .donationHash(transferTransaction.getHash())
                    .build();
            return starChallengeDTO;
        } else { throw new Exception();}
    }
    @Override
    public void addToken(UserDTO userDTO, int amount) throws Exception {
        User user = userRepository.findByEmail(userDTO.getEmail()).get();
        Credentials credentials = web3jUtil.getCredentials(user.getWallet().getPrivateKey());
        gasCheck(credentials);
        Transaction transaction = transferToken(web3jUtil.getAdminCredentials(ADMIN_PRIVATE_KEY), credentials.getAddress(), amount);
        transactionRepository.save(transaction);
        user.getWallet().setCash(getTokenAmount(user));
        walletRepository.save(user.getWallet());
    }
    @Override
    public String fundToken(User user, String fundContract, long amount) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(user.getWallet().getPrivateKey());
        gasCheck((credentials));
        TransactionManager transactionManager = new RawTransactionManager(web3j, credentials, 97889218, 300, 100L);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        //increase Allowance
        ERC20 erc20 = ERC20.load(TOKENCONTRACTADDRESS, web3j, transactionManager, gasProvider);
        String trasactionHash = erc20.increaseAllowance(fundContract, BigInteger.valueOf(amount)).send().getTransactionHash();
        Transaction transaction = web3jUtil.makeTransactionEntity(web3j.ethGetTransactionByHash(trasactionHash).send().getResult());
        transactionRepository.save(transaction);
        //funToken
        FundRaising fundRaising = FundRaising.load(fundContract, web3j, transactionManager, gasProvider);
        trasactionHash = fundRaising.fundToken(BigInteger.valueOf(amount)).send().getTransactionHash();
        transaction = web3jUtil.makeTransactionEntity(web3j.ethGetTransactionByHash(trasactionHash).send().getResult());
        transactionRepository.save(transaction);
        user.getWallet().setCash(getTokenAmount(user));
        walletRepository.save(user.getWallet());
        return transaction.getHash();
    }
    @Override
    public void withdrawToken(String fundContract, int amount, String privatekey) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(privatekey);
        gasCheck((credentials));
        ContractGasProvider gasProvider = new DefaultGasProvider();
        TransactionManager transactionManager = new RawTransactionManager(web3j, credentials, 97889218, 300, 100L);
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

    private Transaction transferToken(Credentials fromCredentials, String toAddress, long amount) throws Exception {
        ContractGasProvider gasProvider = new DefaultGasProvider();
        TransactionManager transactionManager = new RawTransactionManager(web3j, fromCredentials, 97889218, 300, 100L);
        IERC20 ierc20 = IERC20.load(TOKENCONTRACTADDRESS, web3j, transactionManager, gasProvider);
        String hash = ierc20.transfer(toAddress, new BigInteger(String.valueOf(amount))).send().getTransactionHash();
        Transaction transaction = web3jUtil.makeTransactionEntity(web3j.ethGetTransactionByHash(hash).send().getResult());

        return transaction;
    }
    private void gasCheck(Credentials credentials) throws Exception {
        Transaction transaction = web3jUtil.gasCheck(credentials);
        if (transaction != null) {
            transactionRepository.save(transaction);
        }
    }

    @Override
    public int getTokenAmount(User user) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(user.getWallet().getPrivateKey());
        TransactionManager transactionManager = new RawTransactionManager(
                web3j, credentials, 97889218, 100, 100L);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        IERC20 ierc20 = IERC20.load(TOKENCONTRACTADDRESS, web3j, transactionManager, gasProvider);
        BigInteger tokenBalance = ierc20.balanceOf(credentials.getAddress()).send();
        return tokenBalance.intValue();
    }

    @Override
    public int getTokenAmount(User user, String address) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(user.getWallet().getPrivateKey());
        TransactionManager transactionManager = new RawTransactionManager(
                web3j, credentials, 97889218, 100, 100L);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        IERC20 ierc20 = IERC20.load(TOKENCONTRACTADDRESS, web3j, transactionManager, gasProvider);
        BigInteger tokenBalance = ierc20.balanceOf(address).send();
        return tokenBalance.intValue();
    }

    public int getParticipateNum(String contractAddress, User user) throws Exception {
        Credentials credentials = web3jUtil.getCredentials(user.getWallet().getPrivateKey());
        TransactionManager transactionManager = new RawTransactionManager(
                web3j, credentials, 97889218, 100, 100L);
        ContractGasProvider gasProvider = new DefaultGasProvider();
        FundRaising fundRaising = FundRaising.load(contractAddress, web3j, transactionManager, gasProvider);
        BigInteger participatedNum = fundRaising.participatedNum().send();
        return participatedNum.intValue();
    }

    @Override
    public List<TransactionDTO> getTransactions() {
        List<Transaction> list = transactionRepository.findAll();
        List<TransactionDTO> DTOList = new ArrayList<>();
        for (Transaction item: list) {
            DTOList.add(TransactionDTO.builder()
                    .hash(item.getHash())
                    .fromHash(item.getFromHash())
                    .toHash(item.getToHash())
                    .reg(item.getReg())
                    .build()
            );
        }

        return DTOList;
    }
}
