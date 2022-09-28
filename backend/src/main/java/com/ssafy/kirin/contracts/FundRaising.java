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
    public static final String BINARY = "0x60806040523480156200001157600080fd5b50604051620012d6380380620012d68339818101604052810190620000379190620001c7565b84600181905550836000819055508260038190555081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060048190555050505050506200024f565b600080fd5b6000819050919050565b6200013c8162000127565b81146200014857600080fd5b50565b6000815190506200015c8162000131565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200018f8262000162565b9050919050565b620001a18162000182565b8114620001ad57600080fd5b50565b600081519050620001c18162000196565b92915050565b600080600080600060a08688031215620001e657620001e562000122565b5b6000620001f6888289016200014b565b955050602062000209888289016200014b565b94505060406200021c888289016200014b565b93505060606200022f88828901620001b0565b92505060806200024288828901620001b0565b9150509295509295909350565b611077806200025f6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063ad33513f11610097578063d350fe1f11610066578063d350fe1f14610255578063d5f3948814610273578063f7e826de14610291578063fc0c546a146102af57610100565b8063ad33513f14610205578063b0f7ea2114610223578063ca628c7814610241578063d11711a21461024b57610100565b806360555394116100d3578063605553941461017b5780638b0d0258146101995780638f4458c3146101c9578063a46f20b2146101e757610100565b80631797a0021461010557806338af3eed14610123578063419cd5e614610141578063604a7c921461015d575b600080fd5b61010d6102cd565b60405161011a9190610b77565b60405180910390f35b61012b6102d7565b6040516101389190610bd3565b60405180910390f35b61015b60048036038101906101569190610c1f565b6102fd565b005b610165610453565b6040516101729190610b77565b60405180910390f35b6101836104f6565b6040516101909190610b77565b60405180910390f35b6101b360048036038101906101ae9190610c1f565b6104fc565b6040516101c09190610b77565b60405180910390f35b6101d1610520565b6040516101de9190610b77565b60405180910390f35b6101ef610526565b6040516101fc9190610b77565b60405180910390f35b61020d61052c565b60405161021a9190610b77565b60405180910390f35b61022b610532565b6040516102389190610b77565b60405180910390f35b610249610538565b005b6102536109e9565b005b61025d610a54565b60405161026a9190610b77565b60405180910390f35b61027b610a5e565b6040516102889190610bd3565b60405180910390f35b610299610a84565b6040516102a69190610b77565b60405180910390f35b6102b7610a8a565b6040516102c49190610bd3565b60405180910390f35b6000600a54905090565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6001544211801561030f575060005442105b61034e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161034590610ca9565b60405180910390fd5b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016103ad93929190610cc9565b6020604051808303816000875af11580156103cc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f09190610d38565b506103fa33610ab0565b80600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546104499190610d94565b9250508190555050565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016104b09190610bd3565b602060405180830381865afa1580156104cd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f19190610ddd565b905090565b60015481565b6009818154811061050c57600080fd5b906000526020600020016000915090505481565b60005481565b60035481565b600b5481565b60045481565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105bf90610e56565b60405180910390fd5b600054421161060c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060390610ec2565b60405180910390fd5b6000610616610453565b9050600354600454106106c957600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b8152600401610680929190610ee2565b6020604051808303816000875af115801561069f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c39190610d38565b506109e6565b600060076000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541115610943576003546004546003546107469190610f0b565b60076000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546107b29190610f3f565b6107bc9190610fc8565b600b81905550600b54816107d09190610f0b565b600a81905550600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33600a546040518363ffffffff1660e01b8152600401610835929190610ee2565b6020604051808303816000875af1158015610854573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108789190610d38565b50600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600b546040518363ffffffff1660e01b81526004016108fa929190610ee2565b6020604051808303816000875af1158015610919573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093d9190610d38565b506109e5565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016109a0929190610ee2565b6020604051808303816000875af11580156109bf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e39190610d38565b505b5b50565b600154421180156109fb575060005442105b610a3a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3190610ca9565b60405180910390fd5b60046000815480929190610a4d90610ff9565b9190505550565b6000600b54905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600a5481565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403610b5b576008819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50565b6000819050919050565b610b7181610b5e565b82525050565b6000602082019050610b8c6000830184610b68565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610bbd82610b92565b9050919050565b610bcd81610bb2565b82525050565b6000602082019050610be86000830184610bc4565b92915050565b600080fd5b610bfc81610b5e565b8114610c0757600080fd5b50565b600081359050610c1981610bf3565b92915050565b600060208284031215610c3557610c34610bee565b5b6000610c4384828501610c0a565b91505092915050565b600082825260208201905092915050565b7f6f6e6c792046756e6420696e2070726f67726573730000000000000000000000600082015250565b6000610c93601583610c4c565b9150610c9e82610c5d565b602082019050919050565b60006020820190508181036000830152610cc281610c86565b9050919050565b6000606082019050610cde6000830186610bc4565b610ceb6020830185610bc4565b610cf86040830184610b68565b949350505050565b60008115159050919050565b610d1581610d00565b8114610d2057600080fd5b50565b600081519050610d3281610d0c565b92915050565b600060208284031215610d4e57610d4d610bee565b5b6000610d5c84828501610d23565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610d9f82610b5e565b9150610daa83610b5e565b9250828201905080821115610dc257610dc1610d65565b5b92915050565b600081519050610dd781610bf3565b92915050565b600060208284031215610df357610df2610bee565b5b6000610e0184828501610dc8565b91505092915050565b7f6f6e6c792062656e65666963696172792063616c6c20746869732066756e6300600082015250565b6000610e40601f83610c4c565b9150610e4b82610e0a565b602082019050919050565b60006020820190508181036000830152610e6f81610e33565b9050919050565b7f6f6e6c792061667465722046756e6420636c6f73657300000000000000000000600082015250565b6000610eac601683610c4c565b9150610eb782610e76565b602082019050919050565b60006020820190508181036000830152610edb81610e9f565b9050919050565b6000604082019050610ef76000830185610bc4565b610f046020830184610b68565b9392505050565b6000610f1682610b5e565b9150610f2183610b5e565b9250828203905081811115610f3957610f38610d65565b5b92915050565b6000610f4a82610b5e565b9150610f5583610b5e565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610f8e57610f8d610d65565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610fd382610b5e565b9150610fde83610b5e565b925082610fee57610fed610f99565b5b828204905092915050565b600061100482610b5e565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361103657611035610d65565b5b60018201905091905056fea2646970667358221220f4aef371ba49f762c566a5643ae6b5cc53465125ac72acd0baa7313f2aad82d564736f6c63430008100033";

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

    public static final String FUNC_PARTICIPATE = "participate";

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

    public RemoteFunctionCall<TransactionReceipt> participate() {
        final Function function = new Function(
                FUNC_PARTICIPATE, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
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
        String encodedConstructor = FunctionEncoder.encodeConstructor(
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_startTime),
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
