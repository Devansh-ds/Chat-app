package com.devansh.response;

import lombok.Builder;

@Builder
public record UserDto(
        Integer id,
        String fullname,
        String profilePicture,
        String email
) {
}
