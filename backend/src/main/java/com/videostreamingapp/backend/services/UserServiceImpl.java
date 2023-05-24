package com.videostreamingapp.backend.services;

import com.videostreamingapp.backend.config.JwtService;
import com.videostreamingapp.backend.dao.UserDao;
import com.videostreamingapp.backend.dto.user.CreateUserDto;
import com.videostreamingapp.backend.dto.user.LoginUserDto;
import com.videostreamingapp.backend.entities.user.User;
import com.videostreamingapp.backend.exceptions.AlreadyExistException;
import com.videostreamingapp.backend.exceptions.DoesNotExistException;
import com.videostreamingapp.backend.exceptions.WrongCredentialsException;
import com.videostreamingapp.backend.exceptions.WrongPasswordFormatException;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
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

    @Override
    public String login(LoginUserDto loginData) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginData.email.toLowerCase(),
                        loginData.password));

        User user = userDao.findByEmail(loginData.email.toLowerCase())
                .orElseThrow(() -> new DoesNotExistException("User doesn't exist"));
        String token = jwtService.generateToken(user);
        return token;
    }
}
