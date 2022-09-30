package com.ssafy.kirin.repository;

import com.ssafy.kirin.entity.Transaction;
import com.ssafy.kirin.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
