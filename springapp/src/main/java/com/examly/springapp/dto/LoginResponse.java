package com.examly.springapp.dto;

import lombok.Builder;
import lombok.Getter;

@Getter 
@Builder 
public class LoginResponse {
    public String token;
    public String message;
}
