package com.example.fullstackappexample.dto;

import com.example.fullstackappexample.model.Assignment;
import com.example.fullstackappexample.utils.AssignmentEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {
    private Assignment assignment;
    private List<AssignmentEnum> assignmentEnums = new ArrayList<>();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
        Arrays.stream(AssignmentEnum.values()).forEach(assignmentEnum -> {
            assignmentEnums.add(assignmentEnum);
        });
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public List<AssignmentEnum> getAssignmentEnums() {

        return assignmentEnums;
    }
}
