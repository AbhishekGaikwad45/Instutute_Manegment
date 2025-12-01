package com.institute.controller;

import com.institute.model.Attendance;
import com.institute.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping("/mark")
    public ResponseEntity<?> mark(@RequestBody Map<String, Object> body) {
        String batchCode = (String) body.get("batchCode");
        Integer facultyId = body.get("facultyId") == null ? null : (Integer) body.get("facultyId");
        String facultyCode = (String) body.get("facultyCode");
        String date = body.get("date") == null ? null : body.get("date").toString();

        @SuppressWarnings("unchecked")
        List<Map<String, String>> records = (List<Map<String, String>>) body.get("records");

        String msg = service.saveAttendance(batchCode, facultyId, facultyCode, date, records);
        return ResponseEntity.ok(Map.of("message", msg));
    }

    @GetMapping("/batch/{batchCode}/all")
    public ResponseEntity<?> all(@PathVariable String batchCode) {
        return ResponseEntity.ok(service.getAllForBatch(batchCode));
    }

    @GetMapping("/batch/{batchCode}/date/{date}")
    public ResponseEntity<?> byDate(@PathVariable String batchCode, @PathVariable String date) {
        return ResponseEntity.ok(service.getByBatchAndDate(batchCode, date));
    }

    @GetMapping("/batch/{batchCode}/dates")
    public ResponseEntity<?> dates(@PathVariable String batchCode) {
        return ResponseEntity.ok(service.getDatesForBatch(batchCode));
    }
}
