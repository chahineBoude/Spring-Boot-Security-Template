package com.example.fullstackappexample.controller;

import com.example.fullstackappexample.config.JwtUtil;
import com.example.fullstackappexample.model.UserDetailImpl;
import com.example.fullstackappexample.request.LoginRequest;
import com.example.fullstackappexample.response.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login (@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        UserDetailImpl userDetail = (UserDetailImpl) authentication.getPrincipal();
        List<String> roles = userDetail.getAuthorities().stream()
                            .map(item -> item.getAuthority())
                            .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetail.getId(),
                userDetail.getUsername(),
                roles));
    }

}
