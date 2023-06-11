package com.videostreamingapp.backend.services;

import com.videostreamingapp.backend.repositories.UserRepository;
import com.videostreamingapp.backend.dto.user.CreateUserDto;
import com.videostreamingapp.backend.dto.user.LoginUserDto;
import com.videostreamingapp.backend.entities.User;
import com.videostreamingapp.backend.exceptions.AlreadyExistException;
import com.videostreamingapp.backend.exceptions.DoesNotExistException;
import com.videostreamingapp.backend.exceptions.WrongPasswordFormatException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService  {
    @Autowired
    private UserRepository userDao;
    @Autowired
    private  PasswordEncoder passwordEncoder;
    @Autowired
    private  JwtService jwtService;
    @Autowired
    private  AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;


    public String createUser(CreateUserDto userData) {
        Optional<User> user = userDao.findByEmail(userData.email.toLowerCase());
        if (user.isPresent())
            throw new AlreadyExistException("User already exists");

        if (Pattern.matches("^(?=.*\\d)(?=.*[a-zA-Z])[\\w\\s\\S]{6,}$", userData.password) == false)
            throw new WrongPasswordFormatException("Password Format Wrong, atleast 6 characters alphanumeric");

        String hashedPassword = passwordEncoder.encode(userData.password);

        userDao.save(new User(userData.name.toUpperCase(), userData.email.toLowerCase(), hashedPassword));
        return "User created successfully";
    }


    public String login(LoginUserDto loginData) {
        User user = userDao.findByEmail(loginData.email.toLowerCase())
                .orElseThrow(() -> new DoesNotExistException("User doesn't exist"));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginData.email.toLowerCase(),
                        loginData.password));

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginData.email);


        String token = jwtService.generateToken(userDetails);
        return token;
    }
}
