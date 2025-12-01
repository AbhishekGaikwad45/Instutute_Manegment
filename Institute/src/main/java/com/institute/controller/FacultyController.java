package com.institute.controller;

import com.institute.model.Faculty;
import com.institute.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin("*")
public class FacultyController {

    @Autowired
    private FacultyService service;




    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {

        try {
            String email = req.get("email");
            String birthDate = req.get("birthDate");

            Faculty f = service.login(email, birthDate);

            return ResponseEntity.ok(f);

        } catch (RuntimeException ex) {
            return ResponseEntity.status(401)
                    .body(Collections.singletonMap("error", ex.getMessage()));
        }
    }


    // ADD
    @PostMapping("/add")
    public ResponseEntity<?> addFaculty(@RequestBody Faculty faculty) {

        try {
            Faculty saved = service.addFaculty(faculty);
            return ResponseEntity.ok(saved);

        } catch (RuntimeException ex) {
            // 🛑 यामुळे React ला JSON मध्ये error मिळतो
            return ResponseEntity
                    .status(400)
                    .body(Map.of("error", ex.getMessage()));
        }
    }


    // GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<Faculty>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    // GET BY CODE
    @GetMapping("/{code}")
    public ResponseEntity<?> getByCode(@PathVariable String code) {
        return ResponseEntity.ok(service.getFacultyByCode(code));
    }

    // UPDATE
    @PutMapping("/update/{code}")
    public ResponseEntity<?> updateFaculty(@PathVariable String code, @RequestBody Faculty fac) {
        return ResponseEntity.ok(service.updateFaculty(code, fac));
    }

    // DELETE
    @DeleteMapping("/delete/{code}")
    public ResponseEntity<?> delete(@PathVariable String code) {
        return ResponseEntity.ok(service.deleteByCode(code));
    }

    @GetMapping("/check/{email}")
    public ResponseEntity<?> checkFacultyEmail(@PathVariable String email) {
        Faculty fac = service.getFacultyByEmail(email);
        return ResponseEntity.ok(Map.of("exists", fac != null));
    }

}
