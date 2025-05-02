package com.devansh.mapper;

import com.devansh.model.User;
import com.devansh.response.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public UserDto toUserDto(User user) {
        return UserDto
                .builder()
                .fullname(user.getFullname())
                .email(user.getEmail())
                .profilePicture(user.getProfilePicture())
                .id(user.getId())
                .build();
    }

}
