package com.devansh.service;

import com.devansh.exception.UserException;
import com.devansh.model.User;
import com.devansh.request.UpdateUserRequest;
import com.devansh.response.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {

    UserDto findUserById(Integer id) throws UserException;
    User findUnsafeUserById(Integer id) throws UserException;
    UserDto findUserProfile(String jwtToken) throws UserException;
    UserDto updateUser(Integer userId, UpdateUserRequest request) throws UserException;
    List<UserDto> searchUser(String query);
    User findByJwtToken(String token) throws UserException;
}
