package com.institute.repository;

import com.institute.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    @Query(value = "SELECT COUNT(*) FROM enquiries WHERE created_at = CURRENT_DATE()", nativeQuery = true)
    int countTodayEnquiries();
}

