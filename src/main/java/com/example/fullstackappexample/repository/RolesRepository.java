package com.example.fullstackappexample.repository;

import com.example.fullstackappexample.model.Role;
import com.example.fullstackappexample.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends CrudRepository<Role, Long> {
}
