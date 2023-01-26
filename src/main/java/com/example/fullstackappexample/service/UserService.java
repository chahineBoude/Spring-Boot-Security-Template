package com.example.fullstackappexample.service;

import com.example.fullstackappexample.config.JwtUtil;
import com.example.fullstackappexample.model.User;
import com.example.fullstackappexample.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtUtil jwtUtil;

    public String getUsername (String token){
        String username = jwtUtil.getUserNameFromJwtToken(token);
        return username;
    }

}
