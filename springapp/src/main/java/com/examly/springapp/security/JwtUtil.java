package com.examly.springapp.security;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component 
public class JwtUtil {
    private  final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expiration_time = 3600000*24;

     private String buildToken(String email){
        return Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis()+expiration_time))
                    .signWith(key)
                    .compact();
    }

    public String generateToken(UserDetails userDetails){
        return buildToken(userDetails.getUsername());
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody();
    }

    public String extractUserName(String token){
        return extractAllClaims(token).getSubject();
    }

    private Date extractExpiration(String token){
        return extractAllClaims(token).getExpiration();
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        String username = extractUserName(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
