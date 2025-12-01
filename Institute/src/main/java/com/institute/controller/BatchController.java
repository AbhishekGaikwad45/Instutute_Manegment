package com.institute.controller;

import com.institute.model.Batch;
import com.institute.model.Faculty;
import com.institute.model.Student;
import com.institute.model.StudentBatch;
import com.institute.repository.StudentBatchRepository;
import com.institute.repository.StudentRepository;
import com.institute.service.BatchService;
import com.institute.service.FacultyService;
import com.institute.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/batch")
@CrossOrigin("*")
public class BatchController {

    @Autowired
    private BatchService service;

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentBatchRepository studentBatchRepository;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private BatchService batchService;



    // -------------------------------------------
    // CREATE BATCH
    // -------------------------------------------
    @PostMapping("/add")
    public ResponseEntity<?> addBatch(@RequestBody Batch batch) {
        Batch saved = service.saveBatch(batch);
        return ResponseEntity.ok(saved);
    }


    // -------------------------------------------
    // GET ALL BATCHES
    // -------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<List<Batch>> getAllBatches() {
        return ResponseEntity.ok(service.getAllBatches());
    }


    // -------------------------------------------
    // GET BATCH BY batchCode
    // -------------------------------------------
    @GetMapping("/code/{batchCode}")
    public ResponseEntity<?> getBatchByCode(@PathVariable String batchCode) {

        Batch batch = service.getBatchByCode(batchCode);

        if (batch == null)
            return ResponseEntity.status(404).body(Map.of("error", "Batch not found"));

        Faculty faculty = null;

        if (batch.getFacultyCode() != null) {
            faculty = facultyService.getFacultyByCode(batch.getFacultyCode());
        }

        // NULL SAFE RESPONSE
        Map<String, Object> response = new HashMap<>();
        response.put("batch", batch);
        response.put("faculty", faculty); // faculty NULL असेल तरी चालेल

        return ResponseEntity.ok(response);
    }



    // -------------------------------------------
    // UPDATE BATCH BY batchCode
    // -------------------------------------------
    @PutMapping("/update/{batchCode}")
    public ResponseEntity<?> updateBatch(
            @PathVariable String batchCode,
            @RequestBody Batch newBatch) {

        Batch updated = service.updateBatchByCode(batchCode, newBatch);

        if (updated == null)
            return ResponseEntity.status(404).body(Map.of("error", "Batch not found"));

        return ResponseEntity.ok(updated);
    }


    // -------------------------------------------
    // DELETE BATCH BY batchCode
    // -------------------------------------------
    @DeleteMapping("/delete/{batchCode}")
    public ResponseEntity<?> deleteBatch(@PathVariable String batchCode) {

        boolean deleted = service.deleteBatchByCode(batchCode);

        if (!deleted)
            return ResponseEntity.status(404).body(Map.of("error", "Batch not found"));

        return ResponseEntity.ok(Map.of("message", "Batch Deleted Successfully!"));
    }


    // -------------------------------------------
    // ASSIGN FACULTY USING batchCode
    // -------------------------------------------
    @PostMapping("/assign-faculty")
    public ResponseEntity<?> assignFaculty(@RequestBody Map<String, String> req) {

        String batchCode = req.get("batchCode");
        String facultyCode = req.get("facultyCode");

        Batch updated = batchService.assignFacultyByCode(batchCode, facultyCode);

        if (updated == null)
            return ResponseEntity.status(400).body(Map.of("error", "Invalid batchCode or facultyCode"));

        return ResponseEntity.ok(updated);
    }



    // -------------------------------------------
    // ASSIGN STUDENT USING batchCode
    // -------------------------------------------
    @PostMapping("/assign-student/{batchCode}")
    public ResponseEntity<?> assignStudentToBatch(
            @PathVariable String batchCode,
            @RequestBody Map<String, String> body) {

        String studentId = body.get("studentId");

        if (studentId == null)
            return ResponseEntity.badRequest().body(Map.of("error", "studentId required"));

        Student updated = service.assignStudentToBatchByCode(studentId, batchCode);

        if (updated == null)
            return ResponseEntity.status(404).body(Map.of("error", "Student or Batch Not Found"));

        return ResponseEntity.ok(updated);
    }


    // -------------------------------------------
    // GET STUDENTS OF A BATCH BY batchCode
    // -------------------------------------------
    @GetMapping("/{batchCode}/students")
    public ResponseEntity<?> getStudentsOfBatch(@PathVariable String batchCode) {

        Batch batch = service.getBatchByCode(batchCode);

        if (batch == null)
            return ResponseEntity.status(404).body(Map.of("error", "Batch not found"));

        List<StudentBatch> mappings = studentBatchRepository.findByBatchCode(batch.getBatchCode());
        List<Student> students = new ArrayList<>();

        for (StudentBatch sb : mappings) {
            Student s = studentRepo.findByStudentId(sb.getStudentId());

            if (s != null) students.add(s);
        }

        return ResponseEntity.ok(students);
    }


    // -------------------------------------------
    // GET BATCHES BY FACULTY
    // -------------------------------------------
    @GetMapping("/by-faculty/{facultyId}")
    public ResponseEntity<List<Batch>> getBatchesByFaculty(@PathVariable int facultyId) {
        return ResponseEntity.ok(service.getBatchesByFaculty(facultyId));
    }



}
