package com.example.fullstackappexample.repository;

import com.example.fullstackappexample.model.Assignment;
import com.example.fullstackappexample.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface AssignmentRepository extends CrudRepository<Assignment,Long> {
        Set<Assignment> findByUser(User user);
        Optional<Assignment> findById(Long id);
}
