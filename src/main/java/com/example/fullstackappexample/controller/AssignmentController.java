package com.example.fullstackappexample.controller;

import com.example.fullstackappexample.model.Assignment;
import com.example.fullstackappexample.model.User;
import com.example.fullstackappexample.repository.UserRepository;
import com.example.fullstackappexample.service.AssignmentService;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    AssignmentService assignmentService;

    @PostMapping("")
    public ResponseEntity<?> createAssignment (@AuthenticationPrincipal User user){
        Assignment assignment = assignmentService.save(user);
        return ResponseEntity.ok(assignment);
    }
}
