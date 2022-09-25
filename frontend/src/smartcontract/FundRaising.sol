// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./IERC20.sol";

contract FundRaising {
    uint256 public fundRaisingCloses; // 이 펀드가 언제 끝나는지 정의한 uint 함수
    address public deployer; // 계약 배포자
    uint256 public targetNum; // 목표치
    uint256 public participatedNum; // 현재 참여자 수
    address public beneficiary; // address type : 이더리움 account를 넣을 수 있음, fund를 수혜할 사람
    address public token; // 어떤 token을 가지고 있는지!!
    mapping(address => uint256) funderToAmount;
    address[] funders;
    uint256[] public amount; // 상태변수 선언

    /**
     * _duration : 기간을 나타내며, 단위는 초, 5분 하고싶으면 300
     * _beneficiary, 돈을 인출할 수 있는 사람, 통상적으론 msg.sender를 통해 계약을 배포한 사람을 함!
     * _token : 우리가 사용할 ERC20 token 주소.
     * _allowAmount : 해당 contract가 가질 수 있는 MGK토큰의 양, MGK토큰단위
     */
    constructor(
        uint256 _duration,
        uint256 _targetNum,
        address _beneficiary,
        address _token
    ) {
        fundRaisingCloses = block.timestamp + _duration; // duration을 통해 끝나는 시간
        targetNum = _targetNum;
        beneficiary = _beneficiary; // address를 받아서 수혜자 등록
        token = _token; // token의 contract address
        deployer = msg.sender;
        participatedNum = 0;
    }

    /**
     * 그냥 참여하는 함순데, 나중에 돈 보내는거랑 같이 하던가, 아니면 지금처럼 따로 두던가
     * 방식을 어떻게 나눠야할지 정해야할듯!
     */
    function participate() external {
        participatedNum++;
    }

    /**
     * @dev Moves fundToken한 사람의 주소에서 토큰을 해당 컨트랙트에 저장한다.
     * Emits a {Transfer} event. from erc20
     * Requirements:
     * - _amount는 내가 가지고 있는 토큰 수보다 작거나 같아야 한다.
     * - _amount에 대한 설정은 따로 안 해놨다. 필요시
     * - 현재는 최소 1MGK 알아서 곱해지도록 설정
     *
     */
    function fundToken(uint256 _amount) external {
        IERC20(token).transferFrom(msg.sender, address(this), _amount);
        addFunder(msg.sender);
        funderToAmount[msg.sender] += _amount;
    }

    /**
     * contract 자체에 토큰를 가지고 있을 수 있기 떄문에, 이를 조회하는 함수
     * 이 컨트랙트가 가지고 있는 현재 토큰의 양을 리턴해줌 : 현재 모금액
     */
    function currentCollection() public view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function addFunder(address _funder) internal {
        if (funderToAmount[_funder] == 0) {
            funders.push(_funder);
        }
    }

    /**
     * 스타만 계약 끝나고 놀 수 있음
     */
    modifier onlyDeployer() {
        require(msg.sender == deployer, "only stars can withdraw");
        _;
    }
    //  require(msg.sender == beneficiary) 수령인과 현재 sender가 같은지,
    // modifier를 활용하면 withdraw() 함수가 사용되기 이전에 미리 체크가 가능하기떄문에, 아래 withdraw보다 효율적
    modifier onlyBeneficiary() {
        require(msg.sender == beneficiary, "only beneficiary call this func");
        _;
    }

    modifier onlyAfterFundCloses() {
        require(block.timestamp > fundRaisingCloses, "only after Fund closes");
        _;
    }

    /**
     * token을 beneficiary로 등록한 주소에만 보내줌(모금액 수령)
     * 조금 이상하지만, 수혜자가 withdraw하면 계약 배포자한테 금액 보내주는 함수
     *
     */
    function withdrawToken() external onlyBeneficiary onlyAfterFundCloses {
        uint256 numsOfToken = currentCollection();
        //참여자 > 목표치 이상 -> 다주고
        // 아니면 비율 나눠 주기
        if (participatedNum >= targetNum) {
            IERC20(token).transfer(msg.sender, numsOfToken);
        } else {
            // 기부 안 하고싶은 스타를 위한,, 0 처리
            if (funderToAmount[deployer] > 0) {
                uint256 toBenefit = (funderToAmount[deployer] *
                    participatedNum) / targetNum;
                uint256 toDepolyer = numsOfToken - toBenefit;
                IERC20(token).transfer(msg.sender, toBenefit);
                IERC20(token).transfer(deployer, toDepolyer);
            } else {
                IERC20(token).transfer(msg.sender, numsOfToken);
            }
        }
    } // 모금액 수령
}
