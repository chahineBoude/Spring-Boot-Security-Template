package com.example.fullstackappexample.controller;

import com.example.fullstackappexample.config.JwtUtil;
import com.example.fullstackappexample.model.Assignment;
import com.example.fullstackappexample.model.User;
import com.example.fullstackappexample.repository.AssignmentRepository;
import com.example.fullstackappexample.repository.UserRepository;
import com.example.fullstackappexample.service.AssignmentService;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    AssignmentService assignmentService;
    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;

    //ADDING INTO ASSIGNMENT TABLE
    @PostMapping("")
    // NO GODDAMN IDEA IF THIS IS HOW YOU'RE SUPPOSED TO DO IT BUT IT WORKS!
    public ResponseEntity<Assignment> createAssignment (@RequestHeader String Authorization /* Authorization == Bearer ${jwt} */){
        String token = Authorization.substring(7, Authorization.length()); //Get JWT from headers
        String username = jwtUtil.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).get();
        Assignment assignment = assignmentService.save(user);
        System.out.print(username); //Just for checking
        return ResponseEntity.ok(assignment);
    }

    @GetMapping("")
    public ResponseEntity<Set<Assignment>> getAssignments(@RequestHeader String Authorization /* Authorization == Bearer ${jwt} */){
        String token = Authorization.substring(7, Authorization.length()); //Get JWT from headers
        String username = jwtUtil.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).get();
        Set<Assignment> assignments = assignmentService.findByUser(user);
        System.out.print(assignments);
        return ResponseEntity.ok().body(assignments);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<Optional<Assignment>> getAssignment(@PathVariable Long assignmentId){
        Optional<Assignment> assignment = assignmentService.findById(assignmentId);
        return ResponseEntity.ok().body(assignment);
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Long assignmentId, @RequestBody Assignment update){
        Assignment assignment = assignmentService.save(update);
        return ResponseEntity.ok().body(assignment);
    }
}
