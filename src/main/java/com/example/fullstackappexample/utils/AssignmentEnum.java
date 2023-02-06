package com.example.fullstackappexample.utils;

public enum AssignmentEnum {
    ASSIGNMENT_1(1, "Assignment name goes here I guess"),
    ASSIGNMENT_2(2, "Assignment name goes here I guess"),
    ASSIGNMENT_3(3, "Assignment name goes here I guess"),
    ASSIGNMENT_4(4, "Assignment name goes here I guess"),
    ASSIGNMENT_5(5, "Assignment name goes here I guess"),
    ASSIGNMENT_6(6, "Assignment name goes here I guess"),
    ASSIGNMENT_7(7, "Assignment name goes here I guess"),
    ASSIGNMENT_8(8, "Assignment name goes here I guess"),
    ASSIGNMENT_9(9, "Assignment name goes here I guess"),
    ASSIGNMENT_10(10, "Assignment name goes here I guess"),
    ASSIGNMENT_11(11, "Assignment name goes here I guess"),
    ASSIGNMENT_12(12, "Assignment name goes here I guess"),
    ASSIGNMENT_13(13, "Assignment name goes here I guess"),
    ASSIGNMENT_14(14, "Assignment name goes here I guess");

    private int assignmentNumber;
    private String assignmentName;
     AssignmentEnum(int assignmentNumber, String assignmentName){
        this.assignmentNumber = assignmentNumber;
        this.assignmentName = assignmentName;
    }

    public int getAssignmentNumber() {
        return assignmentNumber;
    }

    public String getAssignmentName() {
        return assignmentName;
    }
}
