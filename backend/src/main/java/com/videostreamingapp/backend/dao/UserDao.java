package com.videostreamingapp.backend.dao;

import com.videostreamingapp.backend.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User, String> {
    public Optional<User> findByEmail(String email);
}
