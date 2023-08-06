package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.AuthCredentialRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("sign-in")
    public ResponseEntity<?> login(@RequestBody AuthCredentialRequest credentials) {
        System.out.println(credentials);
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.username(),
                            credentials.password()));
            User user = (User) authentication.getPrincipal();
            String token = Jwts.builder()
                    .setSubject((user.getUsername()))
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // Token wygaśnie po 24h
                    .signWith(Keys.hmacShaKeyFor("SecretKeyEngieeringThesisBarbaraMoczulska1234567890qwertyIncreasingHashBytesToBe512BytesMinimum".getBytes()), SignatureAlgorithm.HS512)
                    .compact();
            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, token).body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}

