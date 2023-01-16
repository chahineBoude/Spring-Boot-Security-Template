package com.example.fullstackappexample.service;

import com.example.fullstackappexample.model.Assignment;
import com.example.fullstackappexample.model.User;
import com.example.fullstackappexample.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepository;

    public Assignment save(User user){
        Assignment assignment = new Assignment();
        assignment.setStatus("To be submitted");
        assignment.setUser(user);
        return assignmentRepository.save(assignment);
    }
}
