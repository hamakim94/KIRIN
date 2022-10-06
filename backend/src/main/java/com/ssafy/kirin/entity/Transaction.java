package com.ssafy.kirin.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@DynamicInsert
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String hash;

    String nonce;

    @Column(name = "block_hash")
    String blockHash;

    @Column(name = "block_number")
    String blockNumber;

    @Column(name = "transaction_index")
    String transactionIndex;

    @Column(name = "from_hash")
    String fromHash;

    @Column(name = "to_hash")
    String toHash;

    String value;

    @Column(name = "gas_price")
    String gasPrice;

    String gas;

    String input;

    String creates;

    @Column(name = "public_key")
    String publicKey;

    String r;

    String s;

    Integer v;

    LocalDateTime reg;
}
