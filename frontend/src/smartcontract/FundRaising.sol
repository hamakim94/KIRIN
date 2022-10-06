// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./IERC20.sol";

contract FundRaising {
    uint256 public fundRaisingCloses; // 이 펀드가 언제 끝나는지 정의한 uint 함수
    uint256 public fundRaisingOpens; // 이 펀드가 언제 끝나는지 정의한 uint 함수
    address public deployer; // 계약 배포자
    uint256 public targetNum; // 목표치
    uint256 public participatedNum; // 현재 참여자 수
    uint256 public starAmount; // 스타가 처음에 넣는 양
    address public beneficiary; // address type : 이더리움 account를 넣을 수 있음, fund를 수혜할 사람
    address public token; // 어떤 token을 가지고 있는지!!
    mapping(address => uint256) funderToAmount;
    address[] funders;
    uint256 public benefitAmount; // 최종 전달된 금액(to beneficiary)
    uint256 public refundAmount; //  회수된 금액(to star)

    /**
     * _startTime
     * _endTime : 초 형식
     * _beneficiary, 돈을 인출할 수 있는 사람, 통상적으론 msg.sender를 통해 계약을 배포한 사람을 함!
     * _token : 우리가 사용할 ERC20 token 주소.
     * _allowAmount : 해당 contract가 가질 수 있는 MGK토큰의 양, MGK토큰단위
     */
    constructor(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _targetNum,
        uint256 _starAmount, // 스타가 미리 넣을 토큰의 양
        address _beneficiary,
        address _token
    ) {
        fundRaisingOpens = _startTime;
        fundRaisingCloses = _endTime; // duration을 통해 끝나는 시간
        targetNum = _targetNum;
        starAmount = _starAmount;
        beneficiary = _beneficiary; // address를 받아서 수혜자 등록
        token = _token; // token의 contract address
        deployer = msg.sender;
        participatedNum = 0;
        funderToAmount[msg.sender] += _starAmount;
    }

    /**
     * 기부 챌린지가 끝나고, 얼마만큼 수혜자에게 가는지.
     */
    function getBenefitAmount() public view returns (uint256) {
        return benefitAmount;
    }

    /**
     * 기부 챌린지가 끝나고, 스타가 얼만큼 환불받았는지
     */
    function getRefundAmount() public view returns (uint256) {
        return refundAmount;
    }

    /**
     * 그냥 참여하는 함순데, 나중에 돈 보내는거랑 같이 하던가, 아니면 지금처럼 따로 두던가
     * 방식을 어떻게 나눠야할지 정해야할듯!
     */
    function participate() external onlyInProgress {
        participatedNum++;
    }

    /**
     * @dev Moves fundToken한 사람의 주소에서 토큰을 해당 컨트랙트에 저장한다.
     * Emits a {Transfer} event. from erc20
     * Requirements:
     * - _amount는 내가 가지고 있는 토큰 수보다 작거나 같아야 한다.
     * - _amount에 대한 설정은 따로 안 해놨다. 필요시
     * - 현재는 최소 1MGK 알아서 곱해지도록 설정
     * - 진행 기간만!
     */
    function fundToken(uint256 _amount) external onlyInProgress {
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

    // 수혜자만 인출가능
    modifier onlyBeneficiary() {
        require(msg.sender == beneficiary, "only beneficiary call this func");
        _;
    }
    /**
     * 진행 중일 때만 실행 가능, modifier는 효율적
     */
    modifier onlyInProgress() {
        require(
            (block.timestamp >= fundRaisingOpens) &&
                (block.timestamp < fundRaisingCloses),
            "only Fund in progress"
        );
        _;
    }
    /**
     * 계약 끝났을 때만
     */
    modifier onlyAfterFundCloses() {
        require(block.timestamp > fundRaisingCloses, "only after Fund closes");
        _;
    }

    /**
     * token을 beneficiary로 등록한 주소에만 보내줌(모금액 수령)
     * 수혜자가 withdraw하면 계약 배포자한테 금액 보내주는 함수
     */
    function withdrawToken() external onlyBeneficiary onlyAfterFundCloses {
        uint256 numsOfToken = currentCollection();
        if (participatedNum >= targetNum) {
            IERC20(token).transfer(msg.sender, numsOfToken);
        } else {
            if (funderToAmount[deployer] > 0) {
                refundAmount =
                    (funderToAmount[deployer] * (targetNum - participatedNum)) /
                    targetNum;
                benefitAmount = numsOfToken - refundAmount;

                IERC20(token).transfer(msg.sender, benefitAmount);
                IERC20(token).transfer(deployer, refundAmount);
            } else {
                IERC20(token).transfer(msg.sender, numsOfToken);
            }
        }
    } // 모금액 수령
}
