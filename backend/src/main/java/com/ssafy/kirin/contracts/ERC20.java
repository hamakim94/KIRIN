package com.ssafy.kirin.contracts;

import io.reactivex.Flowable;
import io.reactivex.functions.Function;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.datatypes.generated.Uint8;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
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
public class ERC20 extends Contract {
    public static final String BINARY = "0x60806040523480156200001157600080fd5b506040518060400160405280600581526020017f4b4952494e0000000000000000000000000000000000000000000000000000008152506003908162000058919062000514565b506040518060400160405280600381526020017f4b52540000000000000000000000000000000000000000000000000000000000815250600490816200009f919062000514565b5033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000f733633b9aca00620000fd60201b60201c565b62000716565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200016f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000166906200065c565b60405180910390fd5b789f4f2726179a224501d762422c946590d9100000000000000081106200019557600080fd5b620001a9600083836200029060201b60201c565b8060026000828254620001bd9190620006ad565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620002709190620006f9565b60405180910390a36200028c600083836200029560201b60201c565b5050565b505050565b505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200031c57607f821691505b602082108103620003325762000331620002d4565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200039c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200035d565b620003a886836200035d565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620003f5620003ef620003e984620003c0565b620003ca565b620003c0565b9050919050565b6000819050919050565b6200041183620003d4565b620004296200042082620003fc565b8484546200036a565b825550505050565b600090565b6200044062000431565b6200044d81848462000406565b505050565b5b8181101562000475576200046960008262000436565b60018101905062000453565b5050565b601f821115620004c4576200048e8162000338565b62000499846200034d565b81016020851015620004a9578190505b620004c1620004b8856200034d565b83018262000452565b50505b505050565b600082821c905092915050565b6000620004e960001984600802620004c9565b1980831691505092915050565b6000620005048383620004d6565b9150826002028217905092915050565b6200051f826200029a565b67ffffffffffffffff8111156200053b576200053a620002a5565b5b62000547825462000303565b6200055482828562000479565b600060209050601f8311600181146200058c576000841562000577578287015190505b620005838582620004f6565b865550620005f3565b601f1984166200059c8662000338565b60005b82811015620005c6578489015182556001820191506020850194506020810190506200059f565b86831015620005e65784890151620005e2601f891682620004d6565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600062000644601f83620005fb565b915062000651826200060c565b602082019050919050565b60006020820190508181036000830152620006778162000635565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620006ba82620003c0565b9150620006c783620003c0565b9250828201905080821115620006e257620006e16200067e565b5b92915050565b620006f381620003c0565b82525050565b6000602082019050620007106000830184620006e8565b92915050565b61207380620007266000396000f3fe6080604052600436106100e85760003560e01c806342966c681161008a578063a6f2ae3a11610059578063a6f2ae3a1461031c578063a9059cbb1461033a578063dd62ed3e14610377578063f851a440146103b4576100e8565b806342966c681461024e57806370a082311461027757806395d89b41146102b4578063a457c2d7146102df576100e8565b806323b872dd116100c657806323b872dd14610180578063313ce567146101bd57806339509351146101e857806340c10f1914610225576100e8565b806306fdde03146100ed578063095ea7b31461011857806318160ddd14610155575b600080fd5b3480156100f957600080fd5b506101026103df565b60405161010f9190611493565b60405180910390f35b34801561012457600080fd5b5061013f600480360381019061013a919061154e565b610471565b60405161014c91906115a9565b60405180910390f35b34801561016157600080fd5b5061016a610494565b60405161017791906115d3565b60405180910390f35b34801561018c57600080fd5b506101a760048036038101906101a291906115ee565b61049e565b6040516101b491906115a9565b60405180910390f35b3480156101c957600080fd5b506101d26104d8565b6040516101df919061165d565b60405180910390f35b3480156101f457600080fd5b5061020f600480360381019061020a919061154e565b6104e1565b60405161021c91906115a9565b60405180910390f35b34801561023157600080fd5b5061024c6004803603810190610247919061154e565b610518565b005b34801561025a57600080fd5b5061027560048036038101906102709190611678565b6105b6565b005b34801561028357600080fd5b5061029e600480360381019061029991906116a5565b6105c3565b6040516102ab91906115d3565b60405180910390f35b3480156102c057600080fd5b506102c961060b565b6040516102d69190611493565b60405180910390f35b3480156102eb57600080fd5b506103066004803603810190610301919061154e565b61069d565b60405161031391906115a9565b60405180910390f35b610324610714565b60405161033191906115a9565b60405180910390f35b34801561034657600080fd5b50610361600480360381019061035c919061154e565b610b0e565b60405161036e91906115a9565b60405180910390f35b34801561038357600080fd5b5061039e600480360381019061039991906116d2565b610b31565b6040516103ab91906115d3565b60405180910390f35b3480156103c057600080fd5b506103c9610bb8565b6040516103d69190611733565b60405180910390f35b6060600380546103ee9061177d565b80601f016020809104026020016040519081016040528092919081815260200182805461041a9061177d565b80156104675780601f1061043c57610100808354040283529160200191610467565b820191906000526020600020905b81548152906001019060200180831161044a57829003601f168201915b5050505050905090565b60008061047c610bde565b9050610489818585610be6565b600191505092915050565b6000600254905090565b6000806104a9610bde565b90506104b585846104e1565b506104c1858285610daf565b6104cc858585610e3b565b60019150509392505050565b60006012905090565b6000806104ec610bde565b905061050d8185856104fe8589610b31565b61050891906117dd565b610be6565b600191505092915050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059f9061185d565b60405180910390fd5b6105b282826110b1565b5050565b6105c0338261122c565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60606004805461061a9061177d565b80601f01602080910402602001604051908101604052809291908181526020018280546106469061177d565b80156106935780601f1061066857610100808354040283529160200191610693565b820191906000526020600020905b81548152906001019060200180831161067657829003601f168201915b5050505050905090565b6000806106a8610bde565b905060006106b68286610b31565b9050838110156106fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106f2906118ef565b60405180910390fd5b6107088286868403610be6565b60019250505092915050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16036107a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079d9061195b565b60405180910390fd5b67016345785d8a00003410156107f1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e8906119ed565b60405180910390fd5b6000670de0b6b3a7640000620186a03461080b9190611a0d565b6108159190611a96565b905080600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156108ba576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b190611b13565b60405180910390fd5b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610922573d6000803e3d6000fd5b5080600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205461098f9190611b33565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610a3d91906117dd565b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610afe91906115d3565b60405180910390a3600191505090565b600080610b19610bde565b9050610b26818585610e3b565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610c55576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4c90611bd9565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610cc4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cbb90611c6b565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610da291906115d3565b60405180910390a3505050565b6000610dbb8484610b31565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610e355781811015610e27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1e90611cd7565b60405180910390fd5b610e348484848403610be6565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610eaa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ea190611d69565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610f19576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f1090611dfb565b60405180910390fd5b610f248383836113f9565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610faa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fa190611e8d565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161109891906115d3565b60405180910390a36110ab8484846113fe565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611120576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111790611ef9565b60405180910390fd5b789f4f2726179a224501d762422c946590d91000000000000000811061114557600080fd5b611151600083836113f9565b806002600082825461116391906117dd565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161121491906115d3565b60405180910390a3611228600083836113fe565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361129b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161129290611f8b565b60405180910390fd5b6112a7826000836113f9565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508181101561132d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113249061201d565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516113e091906115d3565b60405180910390a36113f4836000846113fe565b505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561143d578082015181840152602081019050611422565b60008484015250505050565b6000601f19601f8301169050919050565b600061146582611403565b61146f818561140e565b935061147f81856020860161141f565b61148881611449565b840191505092915050565b600060208201905081810360008301526114ad818461145a565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006114e5826114ba565b9050919050565b6114f5816114da565b811461150057600080fd5b50565b600081359050611512816114ec565b92915050565b6000819050919050565b61152b81611518565b811461153657600080fd5b50565b60008135905061154881611522565b92915050565b60008060408385031215611565576115646114b5565b5b600061157385828601611503565b925050602061158485828601611539565b9150509250929050565b60008115159050919050565b6115a38161158e565b82525050565b60006020820190506115be600083018461159a565b92915050565b6115cd81611518565b82525050565b60006020820190506115e860008301846115c4565b92915050565b600080600060608486031215611607576116066114b5565b5b600061161586828701611503565b935050602061162686828701611503565b925050604061163786828701611539565b9150509250925092565b600060ff82169050919050565b61165781611641565b82525050565b6000602082019050611672600083018461164e565b92915050565b60006020828403121561168e5761168d6114b5565b5b600061169c84828501611539565b91505092915050565b6000602082840312156116bb576116ba6114b5565b5b60006116c984828501611503565b91505092915050565b600080604083850312156116e9576116e86114b5565b5b60006116f785828601611503565b925050602061170885828601611503565b9150509250929050565b600061171d826114ba565b9050919050565b61172d81611712565b82525050565b60006020820190506117486000830184611724565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061179557607f821691505b6020821081036117a8576117a761174e565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006117e882611518565b91506117f383611518565b925082820190508082111561180b5761180a6117ae565b5b92915050565b7f6f6e6c792061646d696e2063616e206d696e7400000000000000000000000000600082015250565b600061184760138361140e565b915061185282611811565b602082019050919050565b600060208201905081810360008301526118768161183a565b9050919050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006118d960258361140e565b91506118e48261187d565b604082019050919050565b60006020820190508181036000830152611908816118cc565b9050919050565b7f61646d696e2063616e2774206275792073746800000000000000000000000000600082015250565b600061194560138361140e565b91506119508261190f565b602082019050919050565b6000602082019050818103600083015261197481611938565b9050919050565b7f67726561746572207468616e206f7220657175616c20746f20302e312065746860008201527f6572000000000000000000000000000000000000000000000000000000000000602082015250565b60006119d760228361140e565b91506119e28261197b565b604082019050919050565b60006020820190508181036000830152611a06816119ca565b9050919050565b6000611a1882611518565b9150611a2383611518565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615611a5c57611a5b6117ae565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611aa182611518565b9150611aac83611518565b925082611abc57611abb611a67565b5b828204905092915050565b7f496e73756666696369656e742062616c616e6365000000000000000000000000600082015250565b6000611afd60148361140e565b9150611b0882611ac7565b602082019050919050565b60006020820190508181036000830152611b2c81611af0565b9050919050565b6000611b3e82611518565b9150611b4983611518565b9250828203905081811115611b6157611b606117ae565b5b92915050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611bc360248361140e565b9150611bce82611b67565b604082019050919050565b60006020820190508181036000830152611bf281611bb6565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611c5560228361140e565b9150611c6082611bf9565b604082019050919050565b60006020820190508181036000830152611c8481611c48565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611cc1601d8361140e565b9150611ccc82611c8b565b602082019050919050565b60006020820190508181036000830152611cf081611cb4565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611d5360258361140e565b9150611d5e82611cf7565b604082019050919050565b60006020820190508181036000830152611d8281611d46565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611de560238361140e565b9150611df082611d89565b604082019050919050565b60006020820190508181036000830152611e1481611dd8565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611e7760268361140e565b9150611e8282611e1b565b604082019050919050565b60006020820190508181036000830152611ea681611e6a565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611ee3601f8361140e565b9150611eee82611ead565b602082019050919050565b60006020820190508181036000830152611f1281611ed6565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b6000611f7560218361140e565b9150611f8082611f19565b604082019050919050565b60006020820190508181036000830152611fa481611f68565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b600061200760228361140e565b915061201282611fab565b604082019050919050565b6000602082019050818103600083015261203681611ffa565b905091905056fea26469706673582212208bbbadfd47ebee2b40a2bc754f813f3b4b22ff040008c6b3eb16dc33c3a3d63564736f6c63430008100033";

    public static final String FUNC_ADMIN = "admin";

    public static final String FUNC_NAME = "name";

    public static final String FUNC_SYMBOL = "symbol";

    public static final String FUNC_DECIMALS = "decimals";

    public static final String FUNC_TOTALSUPPLY = "totalSupply";

    public static final String FUNC_BALANCEOF = "balanceOf";

    public static final String FUNC_TRANSFER = "transfer";

    public static final String FUNC_ALLOWANCE = "allowance";

    public static final String FUNC_APPROVE = "approve";

    public static final String FUNC_TRANSFERFROM = "transferFrom";

    public static final String FUNC_INCREASEALLOWANCE = "increaseAllowance";

    public static final String FUNC_DECREASEALLOWANCE = "decreaseAllowance";

    public static final String FUNC_BUY = "buy";

    public static final String FUNC_MINT = "mint";

    public static final String FUNC_BURN = "burn";

    public static final Event APPROVAL_EVENT = new Event("Approval", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    public static final Event TRANSFER_EVENT = new Event("Transfer", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Address>(true) {}, new TypeReference<Uint256>() {}));
    ;

    protected static final HashMap<String, String> _addresses;

    static {
        _addresses = new HashMap<String, String>();
    }

    @Deprecated
    protected ERC20(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected ERC20(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected ERC20(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected ERC20(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public List<ApprovalEventResponse> getApprovalEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(APPROVAL_EVENT, transactionReceipt);
        ArrayList<ApprovalEventResponse> responses = new ArrayList<ApprovalEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ApprovalEventResponse typedResponse = new ApprovalEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, ApprovalEventResponse>() {
            @Override
            public ApprovalEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(APPROVAL_EVENT, log);
                ApprovalEventResponse typedResponse = new ApprovalEventResponse();
                typedResponse.log = log;
                typedResponse.owner = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.spender = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<ApprovalEventResponse> approvalEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(APPROVAL_EVENT));
        return approvalEventFlowable(filter);
    }

    public List<TransferEventResponse> getTransferEvents(TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = extractEventParametersWithLog(TRANSFER_EVENT, transactionReceipt);
        ArrayList<TransferEventResponse> responses = new ArrayList<TransferEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            TransferEventResponse typedResponse = new TransferEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
            typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public Flowable<TransferEventResponse> transferEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(new Function<Log, TransferEventResponse>() {
            @Override
            public TransferEventResponse apply(Log log) {
                Contract.EventValuesWithLog eventValues = extractEventParametersWithLog(TRANSFER_EVENT, log);
                TransferEventResponse typedResponse = new TransferEventResponse();
                typedResponse.log = log;
                typedResponse.from = (String) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.to = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.value = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                return typedResponse;
            }
        });
    }

    public Flowable<TransferEventResponse> transferEventFlowable(DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(TRANSFER_EVENT));
        return transferEventFlowable(filter);
    }

    public RemoteFunctionCall<String> admin() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ADMIN, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Address>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> name() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_NAME, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> symbol() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_SYMBOL, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<BigInteger> decimals() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_DECIMALS, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint8>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> totalSupply() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_TOTALSUPPLY, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<BigInteger> balanceOf(String account) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_BALANCEOF, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(account)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> transfer(String to, BigInteger amount) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_TRANSFER, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(to), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> allowance(String owner, String spender) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(FUNC_ALLOWANCE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(owner), 
                new org.web3j.abi.datatypes.Address(spender)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> approve(String spender, BigInteger amount) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_APPROVE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(spender), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> transferFrom(String from, String to, BigInteger amount) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_TRANSFERFROM, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(from), 
                new org.web3j.abi.datatypes.Address(to), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> increaseAllowance(String spender, BigInteger addedValue) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_INCREASEALLOWANCE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(spender), 
                new org.web3j.abi.datatypes.generated.Uint256(addedValue)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> decreaseAllowance(String spender, BigInteger subtractedValue) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_DECREASEALLOWANCE, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(spender), 
                new org.web3j.abi.datatypes.generated.Uint256(subtractedValue)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> buy() {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_BUY, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> mint(String to, BigInteger amount) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_MINT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Address(to), 
                new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> burn(BigInteger amount) {
        final org.web3j.abi.datatypes.Function function = new org.web3j.abi.datatypes.Function(
                FUNC_BURN, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(amount)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static ERC20 load(String contractAddress, Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC20(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static ERC20 load(String contractAddress, Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new ERC20(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static ERC20 load(String contractAddress, Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return new ERC20(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static ERC20 load(String contractAddress, Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new ERC20(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<ERC20> deploy(Web3j web3j, Credentials credentials, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(ERC20.class, web3j, credentials, contractGasProvider, BINARY, "");
    }

    public static RemoteCall<ERC20> deploy(Web3j web3j, TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(ERC20.class, web3j, transactionManager, contractGasProvider, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<ERC20> deploy(Web3j web3j, Credentials credentials, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(ERC20.class, web3j, credentials, gasPrice, gasLimit, BINARY, "");
    }

    @Deprecated
    public static RemoteCall<ERC20> deploy(Web3j web3j, TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(ERC20.class, web3j, transactionManager, gasPrice, gasLimit, BINARY, "");
    }

    protected String getStaticDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static String getPreviouslyDeployedAddress(String networkId) {
        return _addresses.get(networkId);
    }

    public static class ApprovalEventResponse extends BaseEventResponse {
        public String owner;

        public String spender;

        public BigInteger value;
    }

    public static class TransferEventResponse extends BaseEventResponse {
        public String from;

        public String to;

        public BigInteger value;
    }
}
