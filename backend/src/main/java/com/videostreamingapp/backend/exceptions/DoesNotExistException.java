package com.videostreamingapp.backend.exceptions;

public class DoesNotExistException extends RuntimeException{
    public DoesNotExistException(String message) {
        super(message);
    }
}
