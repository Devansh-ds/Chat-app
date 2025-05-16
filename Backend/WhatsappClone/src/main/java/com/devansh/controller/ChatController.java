package com.devansh.controller;

import com.devansh.exception.ChatException;
import com.devansh.exception.UserException;
import com.devansh.model.Chat;
import com.devansh.request.GroupChatRequest;
import com.devansh.request.SingleChatRequest;
import com.devansh.service.ChatService;
import com.devansh.service.UpdateChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/single")
    public ResponseEntity<Chat> createChat(@RequestBody SingleChatRequest request,
                                           @RequestHeader("Authorization") String mainToken)
            throws UserException {
        return ResponseEntity.ok(chatService.createChat(mainToken, request.userId()));
    }

    @PostMapping("/group")
    public ResponseEntity<Chat> createGroup(@RequestBody GroupChatRequest request,
                                           @RequestHeader("Authorization") String mainToken)
            throws UserException {
        return ResponseEntity.ok(chatService.createGroup(request, mainToken));
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> findChatBuId(@PathVariable Integer chatId) throws ChatException {
        return ResponseEntity.ok(chatService.findChatById(chatId));
    }

    @GetMapping("/user")
    public ResponseEntity<List<Chat>> findAllChatsOfUser(@RequestHeader("Authorization") String mainToken) throws UserException {
        return ResponseEntity.ok(chatService.findAllChatByUserId(mainToken));
    }

    @PutMapping("/{chatId}/add/{userId}")
    public ResponseEntity<Chat> addUserToGroup(@RequestHeader("Authorization") String mainToken,
                                               @PathVariable("chatId") Integer chatId,
                                               @PathVariable("userId") Integer userId)
            throws UserException, ChatException {
        return ResponseEntity.ok(chatService.addUserToGroup(userId, chatId, mainToken));
    }

    @PutMapping("/{chatId}/remove/{userId}")
    public ResponseEntity<Chat> removeUserFromGroup(@RequestHeader("Authorization") String mainToken,
                                                    @PathVariable("chatId") Integer chatId,
                                                    @PathVariable("userId") Integer userId)
        throws UserException, ChatException {
        return ResponseEntity.ok(chatService.removeUserFromGroup(chatId, userId, mainToken));
    }

    @DeleteMapping("/delete/{chatId}")
    public ResponseEntity<String> deleteChat(@PathVariable Integer chatId,
                                             @RequestHeader("Authorization") String mainToken)
            throws ChatException, UserException {
        chatService.deleteChat(chatId, mainToken);
        return ResponseEntity.ok("Chat deleted with id " + chatId);
    }

    @PutMapping("/{chatId}")
    public ResponseEntity<Chat> updateGroup(@PathVariable("chatId") Integer chatId,
                                           @RequestHeader("Authorization") String mainToken,
                                           @RequestBody UpdateChatRequest request)
            throws ChatException, UserException {
        return ResponseEntity.ok(chatService.updateChat(request, mainToken, chatId));
    }

}















