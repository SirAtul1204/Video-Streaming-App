package com.videostreamingapp.backend.utils.common;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
public class CommonErrorResponse {
    public HashMap<String, Object> get(String message){
        HashMap<String, Object> m = new HashMap<>();
        m.put("message", message);
        m.put("success", false);
        return m;
    }
}
