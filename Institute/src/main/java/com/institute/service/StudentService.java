package com.institute.service;

import com.institute.model.Batch;
import com.institute.model.Faculty;
import com.institute.model.Student;
import com.institute.model.StudentBatch;
import com.institute.repository.BatchRepository;
import com.institute.repository.FacultyRepository;
import com.institute.repository.StudentBatchRepository;
import com.institute.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private StudentBatchRepository studentBatchRepo;

    @Autowired
    private BatchRepository batchRepo;

    @Autowired
    private FacultyRepository facultyRepo;

    // generate student id
    public String generateStudentId(String admissionDate) {
        LocalDate date;
        try {
            if (admissionDate == null || admissionDate.trim().isEmpty()) {
                date = LocalDate.now();
            } else {
                date = LocalDate.parse(admissionDate, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            }
        } catch (Exception e) {
            date = LocalDate.now();
        }

        String monthCode = date.getMonth().name().substring(0, 3); // NOV
        long total = studentRepo.count() + 1;
        String number = String.format("%03d", total);
        return monthCode + "-ST-" + number;
    }

    public Student saveStudent(Student student) {
        if (student.getEmail() != null && studentRepo.existsByEmail(student.getEmail())) {
            throw new RuntimeException("Email already exists!");
        }
        if (student.getMobile() != null && studentRepo.existsByMobile(student.getMobile())) {
            throw new RuntimeException("Mobile number already exists!");
        }

        if (student.getAdmissionDate() == null || student.getAdmissionDate().trim().isEmpty()) {
            student.setAdmissionDate(LocalDate.now().toString());
        }

        String newId = generateStudentId(student.getAdmissionDate());
        student.setStudentId(newId);

        return studentRepo.save(student);
    }

    public Student saveStudent(Student student, String batchCode) {
        if (student.getAdmissionDate() == null || student.getAdmissionDate().trim().isEmpty()) {
            student.setAdmissionDate(LocalDate.now().toString());
        }
        String newId = generateStudentId(student.getAdmissionDate());
        student.setStudentId(newId);

        Student saved = studentRepo.save(student);

        Batch batch = batchRepo.findByBatchCode(batchCode);
        if (batch != null) {
            StudentBatch sb = new StudentBatch();
            sb.setStudentId(saved.getStudentId());
            sb.setBatchCode(batchCode);
            studentBatchRepo.save(sb);
        }
        return saved;
    }

    public Student assignStudentToBatch(String studentUniqueId, String batchCode) {
        Student student = studentRepo.findByStudentId(studentUniqueId);
        if (student == null) return null;

        Batch batch = batchRepo.findByBatchCode(batchCode);
        if (batch == null) return null;

        if (studentBatchRepo.existsByStudentIdAndBatchCode(student.getStudentId(), batchCode)) {
            return student;
        }

        StudentBatch sb = new StudentBatch();
        sb.setStudentId(student.getStudentId());
        sb.setBatchCode(batchCode);
        studentBatchRepo.save(sb);

        return student;
    }

    // returns list of { batch, faculty }
    public List<Map<String, Object>> getBatchesForStudent(String studentUniqueId) {
        Student student = studentRepo.findByStudentId(studentUniqueId);
        if (student == null) return List.of();

        List<StudentBatch> mappings = studentBatchRepo.findByStudentId(student.getStudentId());
        List<Map<String, Object>> list = new ArrayList<>();

        for (StudentBatch sb : mappings) {
            Batch batch = batchRepo.findByBatchCode(sb.getBatchCode());
            if (batch == null) continue;

            Map<String, Object> map = new HashMap<>();
            map.put("batch", batch);

            if (batch.getFacultyCode() != null) {
                Faculty faculty = facultyRepo.findByFacultyCode(batch.getFacultyCode());
                map.put("faculty", faculty);
            } else {
                map.put("faculty", null);
            }
            list.add(map);
        }
        return list;
    }

    public Student getStudentByUniqueId(String uniqueId) {
        return studentRepo.findByStudentId(uniqueId);
    }
    public List<Student> getStudentsByBatch(String batchCode) {
        return studentRepo.findStudentsByBatchCode(batchCode);
    }


}
