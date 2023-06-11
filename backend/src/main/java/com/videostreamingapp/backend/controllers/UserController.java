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
    public HashMap<String, Object> createUser(@RequestBody @Valid CreateUserDto body) {
        String res = userService.createUser(body);
        HashMap<String, Object> m = new HashMap<>();
        m.put("message", res);
        m.put("success", true);
        return m;
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, Object>> loginUser(@RequestBody @Valid LoginUserDto body) {
        String token = userService.login(body);
        ResponseCookie springCookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(1000 * 24 * 60)
                .build();
        HashMap<String, Object> m = new HashMap<>();
        m.put("token", token);
        m.put("success", true);
        m.put("message", "Login Successful");
        return ResponseEntity.accepted().header(HttpHeaders.SET_COOKIE, springCookie.toString()).body(m);
    }

}
