//package com.ssafy.kirin.advice;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RequiredArgsConstructor
//@RestControllerAdvice
//public class ExceptionAdvice {
//    private final ResponseService responseService;
//
//    @ExceptionHandler(MemberEmailAlreadyExistsException.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public Result userEmailAlreadyExistsException() {
//        return responseService.getFailureResult(-101, "이미 존재하는 이메일입니다.");
//    }
//}
