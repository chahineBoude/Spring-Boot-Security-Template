package com.example.fullstackappexample.controller;

import com.example.fullstackappexample.config.JwtUtil;
import com.example.fullstackappexample.model.User;
import com.example.fullstackappexample.repository.UserRepository;
import com.example.fullstackappexample.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("")
    public ResponseEntity<List<String>> getUsername(@RequestHeader String Authorization){
        List<String> listU = new ArrayList<>();
        String token = Authorization.substring(7, Authorization.length());
        String username = userService.getUsername(token);
        listU.add(username);
        return ResponseEntity.ok().body(listU);
    }
}
