package com.dinner.Whatistomorrowfordinner.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    //tmpUSUŃ
    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    //tmpUSUŃ
    @GetMapping("/helloAdmin")
    public String helloAdmin() {
        return "helloAdmin";
    }

    //tmpUSUŃ
    @GetMapping("/")
    public String aaa() {
        return "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    }
}

