package com.examly.springapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.dto.LoginResponse;
import com.examly.springapp.dto.SignUpRequest;
import com.examly.springapp.dto.SignUpResponse;
import com.examly.springapp.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(
    name = "Authentication",
    description = "APIs for user registration and authentication"
)

@RestController 
@RequestMapping("/api/auth")
public class AuthController {
     private final UserService userService;

    AuthController(UserService userService){
        this.userService = userService;
    }

     @Operation(
        summary = "Register a new user",
        description = "Creates a new user account using the provided registration details"
    )
    @PostMapping("/signUp")
    public ResponseEntity<Object> signUp(@RequestBody SignUpRequest signUpRequest){
        try{
            SignUpResponse response = userService.register(signUpRequest);
            return ResponseEntity.ok(response.getMessage());
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

     @Operation(
        summary = "User login",
        description = "Authenticates a user and returns a JWT token"
    )
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest){
        try{
            LoginResponse loginResponse = userService.login(loginRequest);

            Map<String,String> response = new HashMap<>();
            response.put("token",loginResponse.getToken());
            response.put("message",loginResponse.getMessage());
            return ResponseEntity.ok(response);
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }


    }
}
