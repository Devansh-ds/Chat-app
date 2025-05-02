package com.devansh.request;

public record UpdateUserRequest(
        String fullname,
        String profilePicture
) {
}
