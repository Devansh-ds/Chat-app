package com.devansh.controller;

import com.devansh.exception.UserException;
import com.devansh.model.User;
import com.devansh.request.UpdateUserRequest;
import com.devansh.response.UserDto;
import com.devansh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String token) throws UserException {
        return ResponseEntity.ok(userService.findUserProfile(token));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String query,
                                                    @RequestHeader("Authorization") String token) throws UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(userService.searchUser(query));
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestHeader("Authorization") String token,
                                              @RequestBody UpdateUserRequest updateUserRequest) throws UserException {
        User user = userService.findByJwtToken(token);
        return ResponseEntity.ok(userService.updateUser(user.getId(), updateUserRequest));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUser(@PathVariable Integer userId) throws UserException {
        return ResponseEntity.ok(userService.findUserById(userId));
    }

}









