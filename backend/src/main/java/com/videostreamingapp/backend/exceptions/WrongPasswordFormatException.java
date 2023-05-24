package com.videostreamingapp.backend.exceptions;

public class WrongPasswordFormatException extends RuntimeException {
    public WrongPasswordFormatException(String message) {
        super(message);
    }
}
