package com.videostreamingapp.backend.dto.user;

import jakarta.validation.constraints.NotBlank;

public class LoginUserDto {
    @NotBlank(message = "Email field is required")
    public String email;

    @NotBlank(message = "Password field is required")
    public String password;
}
