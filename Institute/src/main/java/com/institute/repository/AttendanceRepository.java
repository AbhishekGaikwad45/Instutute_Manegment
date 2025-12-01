package com.institute.repository;

import com.institute.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
    Attendance findByStudentIdAndDate(String studentId, String date);
    List<Attendance> findByBatchCodeOrderByDateDesc(String batchCode);
    List<Attendance> findByBatchCodeAndDate(String batchCode, String date);
    List<Attendance> findByBatchCode(String batchCode);
}
