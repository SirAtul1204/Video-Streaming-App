package com.videostreamingapp.backend.exceptions;

public class NotAuthorizedException extends RuntimeException{
    public NotAuthorizedException(String message){
        super(message);
    }
}
