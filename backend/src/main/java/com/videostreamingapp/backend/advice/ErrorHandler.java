package com.videostreamingapp.backend.advice;

import com.videostreamingapp.backend.exceptions.AlreadyExistException;
import com.videostreamingapp.backend.exceptions.DoesNotExistException;
import com.videostreamingapp.backend.exceptions.WrongPasswordFormatException;

import com.videostreamingapp.backend.utils.common.CommonErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;

@RestControllerAdvice
public class ErrorHandler {

    @Autowired
    private CommonErrorResponse commonErrorResponse;

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(AlreadyExistException.class)
    public HashMap<String, Object> handleError(AlreadyExistException e) {
        return commonErrorResponse.get(e.getMessage());
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

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(WrongPasswordFormatException.class)
    public HashMap<String, Object> handleError(WrongPasswordFormatException e) {
        return commonErrorResponse.get(e.getMessage());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(DoesNotExistException.class)
    public HashMap<String, Object> handleError(DoesNotExistException e){
        return commonErrorResponse.get(e.getMessage());
    }
}
