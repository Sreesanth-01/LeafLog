package com.examly.springapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class SignUpRequest {
    public String userName;
    public String email;
    public String password;
}
