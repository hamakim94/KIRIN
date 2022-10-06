package com.ssafy.kirin.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.kirin.entity.EmailAuth;
import com.ssafy.kirin.entity.QEmailAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class EmailAuthRepositoryCustomImpl implements EmailAuthRepositoryCustom{
    private final JPAQueryFactory jpaQueryFactory;
    QEmailAuth emailAuth = QEmailAuth.emailAuth;

    @Override
    public Optional<EmailAuth> findValidAuthByEmail(String email, String authToken, LocalDateTime currentTime) {
        EmailAuth auth = jpaQueryFactory
            .selectFrom(emailAuth)
            .where(emailAuth.email.eq(email),
                    emailAuth.authToken.eq(authToken),
                    emailAuth.expireDate.goe(currentTime),
                    emailAuth.isExpired.eq(false))
            .fetchFirst();

        return Optional.ofNullable(auth); // null 값을 허용
    }
}
