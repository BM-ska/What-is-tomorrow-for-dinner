package com.dinner.Whatistomorrowfordinner.controller;

import com.dinner.Whatistomorrowfordinner.model.AuthCredentialRequest;
import com.dinner.Whatistomorrowfordinner.model.UserEntity;
import com.dinner.Whatistomorrowfordinner.repository.UserRepository;
import com.dinner.Whatistomorrowfordinner.security.JwtTokenUtil;
import com.dinner.Whatistomorrowfordinner.service.NutritionPlanService;
import com.dinner.Whatistomorrowfordinner.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class AuthController {

    private final UserRepository userRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(UserRepository userRepository, NutritionPlanService nutritionPlanService) {
        this.userRepository = userRepository;
    }

    @PostMapping("sign-in")
    public ResponseEntity<?> login(@RequestBody AuthCredentialRequest credentials) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credentials.username(),
                            credentials.password()));
            UserEntity user = (UserEntity) authentication.getPrincipal();

            return ResponseEntity.ok().header(HttpHeaders.AUTHORIZATION, JwtTokenUtil.generateToken(user)).body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("sign-up")
    public ResponseEntity<?> createNewUser(@RequestBody AuthCredentialRequest authCredentialRequest) {

        if (userRepository.findByUsername(authCredentialRequest.username()) == null) {

            userService.insertNewUser(authCredentialRequest.username(), authCredentialRequest.password());
            System.out.println(authCredentialRequest.username());

            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);

    }
}

