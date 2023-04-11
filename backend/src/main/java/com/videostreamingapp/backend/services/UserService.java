package com.videostreamingapp.backend.services;

import com.videostreamingapp.backend.dto.user.CreateUserDto;
import com.videostreamingapp.backend.dto.user.LoginUserDto;

public interface UserService {

    public String createUser(CreateUserDto userData);

    public String login(LoginUserDto loginData);
}
