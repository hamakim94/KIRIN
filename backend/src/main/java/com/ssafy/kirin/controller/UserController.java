package com.ssafy.kirin.controller;


import com.ssafy.kirin.config.security.JwtTokenProvider;
import com.ssafy.kirin.dto.UserDTO;
import com.ssafy.kirin.dto.request.UserFindPWRequestDTO;
import com.ssafy.kirin.dto.request.UserLoginRequestDTO;
import com.ssafy.kirin.dto.request.UserModifyRequestDTO;
import com.ssafy.kirin.dto.request.UserSignupRequestDTO;
import com.ssafy.kirin.dto.response.CelebResponseDTO;
import com.ssafy.kirin.dto.response.UserResponseDTO;
import com.ssafy.kirin.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Api(value = "사용자 API",tags = {"사용자 API"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisTemplate redisTemplate;

    @PostMapping("/signup")
    @ApiOperation(value = "사용자 회원가입") // 요청 URL에 매핑된 API에 대한 설명
    public ResponseEntity<?> userSignup(@RequestPart(value = "profileImg", required = false) MultipartFile profileImg, @Valid @RequestPart(value="userDTO") UserSignupRequestDTO userSignupRequestDTO, Errors errors){
        if(errors.hasErrors()){ // 유효성 검사 실패
            Map<String, String> validatorResult = userService.validateHandling(errors);
            for (String key : validatorResult.keySet()) {
                log.error(key + ": " + validatorResult.get(key));
            }

            log.error("유효성 검사 실패");

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try{
            userService.signup(userSignupRequestDTO, profileImg, passwordEncoder);
        } catch (Exception e){
            log.error("회원가입 오류");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        log.info("회원가입 완료");
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    @ApiOperation(value = "사용자 로그인")
    public ResponseEntity<?> userLogin(@RequestBody UserLoginRequestDTO userLoginRequestDTO){
        try{
            UserResponseDTO userDTO = userService.login(userLoginRequestDTO, passwordEncoder);

            Authentication auth = new UsernamePasswordAuthenticationToken(userDTO.getId(), userLoginRequestDTO.getPassword());
            String accessToken = jwtTokenProvider.createAccessToken(auth); // access token 발급
            String refreshToken = jwtTokenProvider.createRefreshToken(auth); // refresh token 발급

            return ResponseEntity.ok().header("ACCESSTOKEN", accessToken).header("REFRESHTOKEN", refreshToken).body(userDTO);
        } catch (Exception e){
            log.error("로그인 에러: " + e);
            return new ResponseEntity<>("invalid ID", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    @ApiOperation(value = "사용자 로그아웃")
    public ResponseEntity<?> userLogout(HttpServletRequest request,
                                        @ApiIgnore @AuthenticationPrincipal UserDTO user){
        // Redis에 해당 user id로 저장된 refresh token이 있을 경우 삭제
        if (redisTemplate.opsForValue().get(user.getId().toString()) != null) {

            redisTemplate.delete(user.getId().toString());
        }

        String accessToken = jwtTokenProvider.getTokenFromRequest(request, "ACCESSTOKEN");

        // 해당 access token의 유효시간 가지고 와서 logout된 access token 저장
        Long expiration = jwtTokenProvider.getExpiration(accessToken);
        redisTemplate.opsForValue().set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/reissue")
    @ApiOperation(value = "토큰 재발행")
    public ResponseEntity<?> tokenReissue(HttpServletRequest request, HttpServletResponse response) {
        String accessToken = jwtTokenProvider.getTokenFromRequest(request, "ACCESSTOKEN");
        String refreshToken = jwtTokenProvider.getTokenFromRequest(request, "REFRESHTOKEN");
        String userId = jwtTokenProvider.getUserPk(accessToken);

        if(refreshToken.equals(redisTemplate.opsForValue().get(userId)) && jwtTokenProvider.validateToken(refreshToken)){ // refresh token이 유효하면
            Authentication auth = jwtTokenProvider.getAuthentication(accessToken);
            accessToken = jwtTokenProvider.createAccessToken(auth); // accessToken 재발급
            response.setHeader("accesstoken", accessToken);
            auth = jwtTokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(auth); // authentication 재저장

            log.info("token 재발급 성공");
            return new ResponseEntity<>(HttpStatus.OK);
        }
        log.error("token 재발급 실패");
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/confirm-email")
    @ApiOperation(value = "이메일 확인(계정 활성화)")
    public ResponseEntity<?> emailConfirm(@RequestParam(value = "email") String email, @RequestParam(value = "authToken") String authToken) {
        try {
            userService.confirmEmail(email, authToken);
            //            response.sendRedirect("https://i7a202.p.ssafy.io/signup/success.html");
        } catch (Exception e){
            //                response.sendRedirect("https://i7a202.p.ssafy.io/signup/error.html");
            log.error("email auth token 만료");
            // email 만료되면 해당 계정의 이메일, 닉네임은 다시 못 쓰게 할건지? 아니면 해당 user 내역을 삭제해야될지?
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/profiles")
    @ApiOperation(value = "사용자 프로필 정보 조회")
    public ResponseEntity<UserDTO> userProfile(@ApiIgnore @AuthenticationPrincipal UserDTO user){
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/profiles")
    @ApiOperation(value = "사용자 프로필 정보 수정")
    public ResponseEntity<UserResponseDTO> userProfileEdit(@ApiIgnore @AuthenticationPrincipal UserDTO user,
                                                   @RequestPart(value = "profileImg", required = false) MultipartFile profileImg, @Valid @RequestPart String nickname){
        UserResponseDTO changedUserDTO;

        try {
            changedUserDTO = userService.modifyUser(user.getId(), nickname, profileImg);
        } catch (Exception e){
            log.error("userProfileEdit user 조회 실패");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(changedUserDTO, HttpStatus.OK);
    }

    @PostMapping("/subscribes")
    @ApiOperation(value = "스타 구독")
    public ResponseEntity<?> subscribe(@ApiIgnore @AuthenticationPrincipal UserDTO user,
                                       @RequestParam long celebId){
        try{
            userService.subscribe(user.getId(), celebId);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/subscribes")
    @ApiOperation(value = "구독한 스타 목록 조회")
    public ResponseEntity<List<UserResponseDTO>> subscribeStarList(@ApiIgnore @AuthenticationPrincipal UserDTO user){
        List<UserResponseDTO> stars = userService.getCelebListById(user.getId());

        return new ResponseEntity<>(stars, HttpStatus.OK);
    }

    @GetMapping("/check-duplicate/email")
    @ApiOperation(value = "이메일 중복 확인")
    public ResponseEntity<?> emailDuplicateCheck(@RequestParam String email){
        if(userService.checkEmailDuplicate(email)) return new ResponseEntity<>(HttpStatus.OK);

        log.error("email 중복");
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/check-duplicate/nickname")
    @ApiOperation(value = "닉네임 중복 확인")
    public ResponseEntity<?> nicknameDuplicateCheck(@RequestParam String nickname){
        if(userService.checkNicknameDuplicate(nickname)) return new ResponseEntity<>(HttpStatus.OK);

        log.error("nickname 중복");
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/stars")
    @ApiOperation(value = "스타 목록 전체 조회")
    public ResponseEntity<List<UserResponseDTO>> starListGet(){
        List<UserResponseDTO> users = userService.getCelebList();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/stars/{starId}")
    @ApiOperation(value = "스타 정보 조회")
    public ResponseEntity<CelebResponseDTO> starInfoGet(@PathVariable long starId){
        CelebResponseDTO user = userService.getCelebInfo(starId);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/find-password")
    @ApiOperation(value = "비밀번호 찾기")
    public ResponseEntity<?> passwordFind(@ApiIgnore @AuthenticationPrincipal UserDTO user, String email, String name){
        if(user.getEmail().equals(email) && user.getName().equals(name)){
            try {
                userService.findPassword(email, name, passwordEncoder);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            log.error("해당 유저의 이메일, 이름이 아닙니다.");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/change-password")
    @ApiOperation(value = "비밀번호 변경")
    public ResponseEntity<?> passwordUpdate(@ApiIgnore @AuthenticationPrincipal UserDTO user, @RequestBody UserFindPWRequestDTO userFindPWRequestDTO){
        if(user.getId() == userFindPWRequestDTO.getUserId()){
            try {
                userService.updatePassword(userFindPWRequestDTO, passwordEncoder);
                return new ResponseEntity<>(HttpStatus.OK);
            } catch (Exception e){
                log.error("비밀번호 변경 오류: 비밀번호가 일치하지 않음");
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        log.error("사용자 id가 일치하지 않습니다.");
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/change-cover")
    @ApiOperation(value = "커버이미지 변경")
    public ResponseEntity<?> coverImgUpdate(@ApiIgnore @AuthenticationPrincipal UserDTO user, @RequestPart(value = "coverImg", required = false) MultipartFile coverImg){
        try{
            userService.updateCoverImg(user.getId(), coverImg);
        } catch (Exception e){
            log.error("스타가 아닙니다: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/change-star")
    @ApiOperation(value = "스타 소개글 변경")
    public ResponseEntity<?> starInfoUpdate(@ApiIgnore @AuthenticationPrincipal UserDTO user, @RequestBody String info){
        try{
            userService.updateStarInfo(user.getId(), info);
        } catch (Exception e){
            log.error("스타가 아닙니다: " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
