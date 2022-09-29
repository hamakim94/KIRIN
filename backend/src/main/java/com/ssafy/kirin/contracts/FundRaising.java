package com.ssafy.kirin.contracts;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/web3j/web3j/tree/master/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 1.4.1.
 */
@SuppressWarnings("rawtypes")
public class FundRaising extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b50604051620012c9380380620012c98339818101604052810190620000379190620001c7565b84600181905550836000819055508260038190555081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060048190555050505050506200024f565b600080fd5b6000819050919050565b6200013c8162000127565b81146200014857600080fd5b50565b6000815190506200015c8162000131565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200018f8262000162565b9050919050565b620001a18162000182565b8114620001ad57600080fd5b50565b600081519050620001c18162000196565b92915050565b600080600080600060a08688031215620001e657620001e562000122565b5b6000620001f6888289016200014b565b955050602062000209888289016200014b565b94505060406200021c888289016200014b565b93505060606200022f88828901620001b0565b92505060806200024288828901620001b0565b9150509295509295909350565b61106a806200025f6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c8063a46f20b211610097578063d350fe1f11610066578063d350fe1f14610240578063d5f394881461025e578063f7e826de1461027c578063fc0c546a1461029a576100f5565b8063a46f20b2146101dc578063ad33513f146101fa578063b0f7ea2114610218578063ca628c7814610236576100f5565b8063604a7c92116100d3578063604a7c921461015257806360555394146101705780638b0d02581461018e5780638f4458c3146101be576100f5565b80631797a002146100fa57806338af3eed14610118578063419cd5e614610136575b600080fd5b6101026102b8565b60405161010f9190610b6a565b60405180910390f35b6101206102c2565b60405161012d9190610bc6565b60405180910390f35b610150600480360381019061014b9190610c12565b6102e8565b005b61015a610446565b6040516101679190610b6a565b60405180910390f35b6101786104e9565b6040516101859190610b6a565b60405180910390f35b6101a860048036038101906101a39190610c12565b6104ef565b6040516101b59190610b6a565b60405180910390f35b6101c6610513565b6040516101d39190610b6a565b60405180910390f35b6101e4610519565b6040516101f19190610b6a565b60405180910390f35b61020261051f565b60405161020f9190610b6a565b60405180910390f35b610220610525565b60405161022d9190610b6a565b60405180910390f35b61023e61052b565b005b6102486109dc565b6040516102559190610b6a565b60405180910390f35b6102666109e6565b6040516102739190610bc6565b60405180910390f35b610284610a0c565b6040516102919190610b6a565b60405180910390f35b6102a2610a12565b6040516102af9190610bc6565b60405180910390f35b6000600a54905090565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600154421180156102fa575060005442105b610339576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033090610c9c565b60405180910390fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161039893929190610cbc565b6020604051808303816000875af11580156103b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103db9190610d2b565b506103e533610a38565b6103ed610ae6565b80600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461043c9190610d87565b9250508190555050565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016104a39190610bc6565b602060405180830381865afa1580156104c0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104e49190610dd0565b905090565b60015481565b600981815481106104ff57600080fd5b906000526020600020016000915090505481565b60005481565b60035481565b600b5481565b60045481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105b290610e49565b60405180910390fd5b60005442116105ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f690610eb5565b60405180910390fd5b6000610609610446565b9050600354600454106106bc57600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610673929190610ed5565b6020604051808303816000875af1158015610692573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b69190610d2b565b506109d9565b600060076000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541115610936576003546004546003546107399190610efe565b60076000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546107a59190610f32565b6107af9190610fbb565b600b81905550600b54816107c39190610efe565b600a81905550600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33600a546040518363ffffffff1660e01b8152600401610828929190610ed5565b6020604051808303816000875af1158015610847573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061086b9190610d2b565b50600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600b546040518363ffffffff1660e01b81526004016108ed929190610ed5565b6020604051808303816000875af115801561090c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109309190610d2b565b506109d8565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610993929190610ed5565b6020604051808303816000875af11580156109b2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d69190610d2b565b505b5b50565b6000600b54905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600a5481565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403610ae3576008819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b60015442118015610af8575060005442105b610b37576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2e90610c9c565b60405180910390fd5b60046000815480929190610b4a90610fec565b9190505550565b6000819050919050565b610b6481610b51565b82525050565b6000602082019050610b7f6000830184610b5b565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610bb082610b85565b9050919050565b610bc081610ba5565b82525050565b6000602082019050610bdb6000830184610bb7565b92915050565b600080fd5b610bef81610b51565b8114610bfa57600080fd5b50565b600081359050610c0c81610be6565b92915050565b600060208284031215610c2857610c27610be1565b5b6000610c3684828501610bfd565b91505092915050565b600082825260208201905092915050565b7f6f6e6c792046756e6420696e2070726f67726573730000000000000000000000600082015250565b6000610c86601583610c3f565b9150610c9182610c50565b602082019050919050565b60006020820190508181036000830152610cb581610c79565b9050919050565b6000606082019050610cd16000830186610bb7565b610cde6020830185610bb7565b610ceb6040830184610b5b565b949350505050565b60008115159050919050565b610d0881610cf3565b8114610d1357600080fd5b50565b600081519050610d2581610cff565b92915050565b600060208284031215610d4157610d40610be1565b5b6000610d4f84828501610d16565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d9282610b51565b9150610d9d83610b51565b9250828201905080821115610db557610db4610d58565b5b92915050565b600081519050610dca81610be6565b92915050565b600060208284031215610de657610de5610be1565b5b6000610df484828501610dbb565b91505092915050565b7f6f6e6c792062656e65666963696172792063616c6c20746869732066756e6300600082015250565b6000610e33601f83610c3f565b9150610e3e82610dfd565b602082019050919050565b60006020820190508181036000830152610e6281610e26565b9050919050565b7f6f6e6c792061667465722046756e6420636c6f73657300000000000000000000600082015250565b6000610e9f601683610c3f565b9150610eaa82610e69565b602082019050919050565b60006020820190508181036000830152610ece81610e92565b9050919050565b6000604082019050610eea6000830185610bb7565b610ef76020830184610b5b565b9392505050565b6000610f0982610b51565b9150610f1483610b51565b9250828203905081811115610f2c57610f2b610d58565b5b92915050565b6000610f3d82610b51565b9150610f4883610b51565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610f8157610f80610d58565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610fc682610b51565b9150610fd183610b51565b925082610fe157610fe0610f8c565b5b828204905092915050565b6000610ff782610b51565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361102957611028610d58565b5b60018201905091905056fea26469706673582212209ac1f254f114606e9cf1bd870910fb1360b6dd955ffa66c04719e470c8d0f05d64736f6c63430008100033";

    public static final String FUNC_AMOUNT = "amount";

    public static final String FUNC_BENEFICIARY = "beneficiary";

    public static final String FUNC_BENEFITAMOUNT = "benefitAmount";

    public static final String FUNC_DEPLOYER = "deployer";

    public static final String FUNC_FUNDRAISINGCLOSES = "fundRaisingCloses";

    public static final String FUNC_FUNDRAISINGOPENS = "fundRaisingOpens";

    public static final String FUNC_PARTICIPATEDNUM = "participatedNum";

    public static final String FUNC_REFUNDAMOUNT = "refundAmount";

    public static final String FUNC_TARGETNUM = "targetNum";

    public static final String FUNC_TOKEN = "token";

    public static final String FUNC_GETBENEFITAMOUNT = "getBenefitAmount";

    public static final String FUNC_GETREFUNDAMOUNT = "getRefundAmount";

    public static final String FUNC_FUNDTOKEN = "fundToken";

    public static final String FUNC_CURRENTCOLLECTION = "currentCollection";

    public static final String FUNC_WITHDRAWTOKEN = "withdrawToken";

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected FundRaising(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected FundRaising(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected FundRaising(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected FundRaising(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public RemoteFunctionCall<BigInteger> amount(BigInteger param0) {
        final Function function = new Function(FUNC_AMOUNT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> beneficiary() {
        final Function function = new Function(FUNC_BENEFICIARY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> benefitAmount() {
        final Function function = new Function(FUNC_BENEFITAMOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> deployer() {
        final Function function = new Function(FUNC_DEPLOYER, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> fundRaisingCloses() {
        final Function function = new Function(FUNC_FUNDRAISINGCLOSES, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> fundRaisingOpens() {
        final Function function = new Function(FUNC_FUNDRAISINGOPENS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> participatedNum() {
        final Function function = new Function(FUNC_PARTICIPATEDNUM, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> refundAmount() {
        final Function function = new Function(FUNC_REFUNDAMOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> targetNum() {
        final Function function = new Function(FUNC_TARGETNUM, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<String> token() {
        final Function function = new Function(FUNC_TOKEN, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> getBenefitAmount() {
        final Function function = new Function(FUNC_GETBENEFITAMOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> getRefundAmount() {
        final Function function = new Function(FUNC_GETREFUNDAMOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> fundToken(BigInteger _amount) {
        final Function function = new Function(
                FUNC_FUNDTOKEN, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> currentCollection() {
        final Function function = new Function(FUNC_CURRENTCOLLECTION, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> withdrawToken() {
        final Function function = new Function(
                FUNC_WITHDRAWTOKEN, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static FundRaising load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new FundRaising(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static FundRaising load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new FundRaising(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static FundRaising load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new FundRaising(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static FundRaising load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new FundRaising(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<FundRaising> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider, BigInteger _startTime, BigInteger _endTime, BigInteger _targetNum, String _beneficiary, String _token) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_startTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_endTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_targetNum), 
                new org.web3j.abi.datatypes.Address(_beneficiary), 
                new org.web3j.abi.datatypes.Address(_token)));
        return deployRemoteCall(FundRaising.class, web3j, credentials, contractGasProvider, BINARY, encodedConstructor);
    }

    public static RemoteCall<FundRaising> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider, BigInteger _startTime, BigInteger _endTime, BigInteger _targetNum, String _beneficiary, String _token) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_startTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_endTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_targetNum), 
                new org.web3j.abi.datatypes.Address(_beneficiary), 
                new org.web3j.abi.datatypes.Address(_token)));
        return deployRemoteCall(FundRaising.class, web3j, transactionManager, contractGasProvider, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<FundRaising> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit, BigInteger _startTime, BigInteger _endTime, BigInteger _targetNum, String _beneficiary, String _token) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_startTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_endTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_targetNum), 
                new org.web3j.abi.datatypes.Address(_beneficiary), 
                new org.web3j.abi.datatypes.Address(_token)));
        return deployRemoteCall(FundRaising.class, web3j, credentials, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    @Deprecated
    public static RemoteCall<FundRaising> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit, BigInteger _startTime, BigInteger _endTime, BigInteger _targetNum, String _beneficiary, String _token) {
        String encodedConstructor = FunctionEncoder.encodeConstructor(Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_startTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_endTime), 
                new org.web3j.abi.datatypes.generated.Uint256(_targetNum), 
                new org.web3j.abi.datatypes.Address(_beneficiary), 
                new org.web3j.abi.datatypes.Address(_token)));
        return deployRemoteCall(FundRaising.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, encodedConstructor);
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }
}
