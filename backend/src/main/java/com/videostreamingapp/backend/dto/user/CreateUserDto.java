package com.videostreamingapp.backend.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class CreateUserDto {

    @NotBlank(message = "Name field is required")
    public String name;

    @NotBlank(message = "Email field is required")
    @Email(message = "A valid email is required")
    public String email;

    @NotBlank(message = "Password field is required")
    public String password;
}
