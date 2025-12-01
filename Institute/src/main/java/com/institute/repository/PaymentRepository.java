package com.institute.repository;

import com.institute.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query(value = "SELECT COUNT(*) FROM payments WHERE status = 'PENDING'", nativeQuery = true)
    int pendingCount();

    @Query(value = "SELECT COALESCE(SUM(amount),0) FROM payments WHERE status = 'PENDING'", nativeQuery = true)
    Double pendingAmount();
}
