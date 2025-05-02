package com.devansh.exception;

import java.time.LocalDateTime;

public record ErrorDetail(
        String error,
        String message,
        LocalDateTime timestamp
) {

}
