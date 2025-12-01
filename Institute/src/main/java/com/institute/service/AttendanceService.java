package com.institute.service;

import com.institute.model.Attendance;
import com.institute.model.Batch;
import com.institute.model.Student;
import com.institute.repository.AttendanceRepository;
import com.institute.repository.BatchRepository;
import com.institute.repository.StudentBatchRepository;
import com.institute.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepo;

    @Autowired
    private BatchRepository batchRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private StudentBatchRepository studentBatchRepo;

    public String saveAttendance(String batchCode, Integer facultyId, String facultyCode,
                                 String date, List<Map<String, String>> records) {

        if (date == null || date.isBlank()) {
            date = LocalDate.now().toString();
        }

        Batch batch = batchRepo.findByBatchCode(batchCode);
        if (batch == null) return "Invalid Batch Code";

        // build set of students actually assigned to this batch for safety
        Set<String> batchStudentIds = studentBatchRepo.findByBatchCode(batchCode)
                .stream()
                .map(sb -> sb.getStudentId())
                .collect(Collectors.toSet());

        int count = 0;

        for (Map<String, String> r : records) {
            String studentId = r.get("studentId");
            String status = r.get("status");

            if (studentId == null || status == null) continue;

            // ensure student belongs to this batch
            if (!batchStudentIds.contains(studentId)) {
                // skip - student's attendance for a batch he doesn't belong to
                continue;
            }

            Student st = studentRepo.findByStudentId(studentId);
            if (st == null) continue;

            Attendance existing = attendanceRepo.findByStudentIdAndDate(studentId, date);

            if (existing != null) {
                // ensure existing record belongs to same batch before overwriting
                if (!Objects.equals(existing.getBatchCode(), batchCode)) {
                    // if existing record is for different batch and same student/date,
                    // create a new record for this batch (rare) or update — choose create:
                    Attendance att = new Attendance();
                    att.setBatchCode(batchCode);
                    att.setDate(date);
                    att.setStudentId(studentId);
                    att.setStudentName(st.getName());
                    att.setStatus(status);
                    att.setFacultyCode(facultyCode);
                    att.setFacultyId(facultyId);
                    attendanceRepo.save(att);
                } else {
                    existing.setStatus(status);
                    existing.setFacultyCode(facultyCode);
                    existing.setFacultyId(facultyId);
                    attendanceRepo.save(existing);
                }
            } else {
                Attendance att = new Attendance();
                att.setBatchCode(batchCode);
                att.setDate(date);
                att.setStudentId(studentId);
                att.setStudentName(st.getName());
                att.setStatus(status);
                att.setFacultyCode(facultyCode);
                att.setFacultyId(facultyId);
                attendanceRepo.save(att);
            }

            count++;
        }

        return "Saved " + count + " records";
    }

    public List<Attendance> getAllForBatch(String batchCode) {
        return attendanceRepo.findByBatchCodeOrderByDateDesc(batchCode);
    }

    public List<Attendance> getByBatchAndDate(String batchCode, String date) {
        return attendanceRepo.findByBatchCodeAndDate(batchCode, date);
    }

    public List<String> getDatesForBatch(String batchCode) {
        return attendanceRepo.findByBatchCode(batchCode)
                .stream()
                .map(Attendance::getDate)
                .distinct()
                .sorted(Comparator.reverseOrder())
                .toList();
    }
}
