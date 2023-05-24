package com.videostreamingapp.backend.advice;

import com.videostreamingapp.backend.exceptions.AlreadyExistException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
public class ErrorHandler {

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(AlreadyExistException.class)
    public HashMap<String, Object> handleError(AlreadyExistException e) {
        HashMap<String, Object> m = new HashMap<>();
        m.put("message", e.getMessage());
        m.put("success", false);
        return m;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public HashMap<String, Object> handleError(MethodArgumentNotValidException e) {
        HashMap<String, Object> m = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error -> {
            m.put(error.getField(), error.getDefaultMessage());
        });
        m.put("success", false);
        return m;
    }
}
