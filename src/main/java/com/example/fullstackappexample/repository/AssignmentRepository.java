package com.example.fullstackappexample.repository;

import com.example.fullstackappexample.model.Assignment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends CrudRepository<Assignment,Long> {

}
