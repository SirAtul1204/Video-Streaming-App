package com.videostreamingapp.backend.controllers;

import com.videostreamingapp.backend.dto.user.CreateUserDto;
import com.videostreamingapp.backend.dto.user.LoginUserDto;
import com.videostreamingapp.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public HashMap<String, String> createUser(@RequestBody @Valid CreateUserDto body) {
        String res = userService.createUser(body);
        HashMap<String, String> m = new HashMap<>();
        m.put("message", res);
        return m;
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, String>> loginUser(@RequestBody @Valid LoginUserDto body){
        String token = userService.login(body);
        ResponseCookie springCookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(1000 * 24 * 60)
                .build();
        HashMap<String, String> m = new HashMap<>();
        m.put("token", token);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, springCookie.toString()).body(m);
    }
}
