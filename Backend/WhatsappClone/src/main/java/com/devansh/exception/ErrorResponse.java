package com.devansh.exception;

import java.util.HashMap;

public class ErrorResponse {
    public HashMap<String,String> errors;

    public ErrorResponse() {
    }

    public ErrorResponse(HashMap<String,String> errors) {
        this.errors = errors;
    }
}
