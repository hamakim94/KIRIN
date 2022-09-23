const fs = require("fs");
const solc = require("solc");
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://j7a708.p.ssafy.io:8888"));
const FundRasing = fs.readFileSync("./smartcontract/FundRaising.sol", { encoding: "utf-8" });
const IERC20 = fs.readFileSync("./smartcontract/IERC20.sol", { encoding: "utf-8" });

var input = {
  language: "Solidity",
  sources: {
    "FundRaising.sol": {
      content: FundRasing,
    },
    "IERC20.sol": {
      content: IERC20,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
// abi 가져오기
const ABI = output.contracts["FundRaising.sol"]["FundRaising"].abi;
// CA 가져오기
const bytecode = output.contracts["FundRaising.sol"]["FundRaising"].evm.bytecode.object;

//ABI 저장하기
const ABI2 = JSON.stringify(ABI);
const bytecode2 = JSON.stringify(bytecode);
fs.writeFileSync("./FundRaisingABI.json", ABI2, "utf-8");
fs.writeFileSync("./FundRaisingByteCode.json", bytecode2);
