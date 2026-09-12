package com.examly.springapp.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.dto.LoginResponse;
import com.examly.springapp.dto.SignUpRequest;
import com.examly.springapp.dto.SignUpResponse;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.security.JwtUtil;

@Service 
public class UserService {
     private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil){
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public SignUpResponse register(SignUpRequest signUpRequest){
        if(userRepo.existsByEmail(signUpRequest.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setUserName(signUpRequest.getUserName());
        user.setEmail(signUpRequest.getEmail());
        
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        userRepo.save(user);
        return SignUpResponse.builder()
            .message("Registered Successfully")
            .build();

    }

    public LoginResponse login(LoginRequest loginRequest){
        String email = loginRequest.getEmail();
        User user = userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("User not found"));

        boolean passwordMatches = passwordEncoder.matches(loginRequest.getPassword(),user.getPassword());

        if(passwordMatches){
            String token = jwtUtil.generateToken(user);
            System.out.println("Token: "+token);
            return LoginResponse.builder()
            .token(token)
            .message("Logged in successfully")
            .build();
        }
        else{
            throw new RuntimeException("Password mismatch");
        }

    }
}
