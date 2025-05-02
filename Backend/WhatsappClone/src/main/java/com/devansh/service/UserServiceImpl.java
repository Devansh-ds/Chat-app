package com.devansh.service;

import com.devansh.config.JwtService;
import com.devansh.exception.UserException;
import com.devansh.mapper.UserMapper;
import com.devansh.model.User;
import com.devansh.repo.UserRepository;
import com.devansh.request.UpdateUserRequest;
import com.devansh.response.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    @Override
    public UserDto findUserById(Integer id) throws UserException {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UserException("user not found with id : " + id));
        return userMapper.toUserDto(user);
    }

    @Override
    public User findUnsafeUserById(Integer id) throws UserException {
        return  userRepository
                .findById(id)
                .orElseThrow(() -> new UserException("user not found with id : " + id));
    }


    @Override
    public UserDto findUserProfile(String jwtToken) throws UserException {
        User user = findByJwtToken(jwtToken);
        return userMapper.toUserDto(user);
    }

    @Override
    public UserDto updateUser(Integer userId, UpdateUserRequest request) throws UserException {
        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new UserException("user not found with id : " + userId));
        if (request.fullname() != null) {
            user.setFullname(request.fullname());
        }
        if (request.profilePicture() != null) {
            user.setProfilePicture(request.profilePicture());
        }
        User updatedUser = userRepository.save(user);
        return userMapper.toUserDto(updatedUser);
    }

    @Override
    public List<UserDto> searchUser(String query) {
        List<User> matchedUsers = userRepository.searchUser(query);
        System.out.println(query);
        System.out.println(matchedUsers);
        return matchedUsers
                .stream()
                .map(userMapper::toUserDto)
                .toList();
    }

    public User findByJwtToken(String token) throws UserException {
        token = token.substring(7);
        String email = jwtService.extractUsername(token);
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new BadCredentialsException("User not found with email: " + email));
        return user;
    }

}
