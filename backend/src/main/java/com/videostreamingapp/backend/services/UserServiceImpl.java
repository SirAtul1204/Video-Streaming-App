package com.videostreamingapp.backend.services;

import com.videostreamingapp.backend.config.JwtService;
import com.videostreamingapp.backend.dao.UserDao;
import com.videostreamingapp.backend.dto.user.CreateUserDto;
import com.videostreamingapp.backend.dto.user.LoginUserDto;
import com.videostreamingapp.backend.entities.user.User;
import com.videostreamingapp.backend.exceptions.AlreadyExistException;
import com.videostreamingapp.backend.exceptions.DoesNotExistException;
import com.videostreamingapp.backend.exceptions.WrongCredentialsException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    @Override
    public String createUser(CreateUserDto userData) {
        Optional<User> user = userDao.findByEmail(userData.email);
        if (user.isPresent()) throw new AlreadyExistException("User already exists");

        String hashedPassword = passwordEncoder.encode(userData.password);

        userDao.save(new User(userData.name, userData.email, hashedPassword));
        return "User created successfully";
    }

    @Override
    public String login(LoginUserDto loginData){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginData.email,
                        loginData.password
                )
        );

        User user = userDao.findByEmail(loginData.email).orElseThrow(() -> new DoesNotExistException("User doesn't exist"));
        String token = jwtService.generateToken(user);
        return token;
    }
}
