package com.ssafy.kirin.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@DynamicInsert
@Table(name = "wallet")
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String address;

    BigDecimal balance;

    BigDecimal cash;

    @Column(name = "private_key")
    String privateKey;

    public void addCash(int amount) {
        cash = cash.add(BigDecimal.valueOf(amount));
    }
    public void subCash(int amount) {
        cash = cash.subtract(BigDecimal.valueOf(amount));
    }
}
