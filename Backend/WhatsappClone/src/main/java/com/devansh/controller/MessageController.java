package com.devansh.controller;

import com.devansh.exception.ChatException;
import com.devansh.exception.MessageException;
import com.devansh.exception.UserException;
import com.devansh.model.Message;
import com.devansh.request.SendMessageRequest;
import com.devansh.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
public class MessageController {

    private final MessageService messageService;

    @PostMapping("/create")
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest req,
                                               @RequestHeader("Authorization") String token)
            throws ChatException, UserException {
        return ResponseEntity.ok(messageService.sendMessage(req, token));
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> findChatMessages(
            @RequestHeader("Authorization") String token,
            @PathVariable("chatId") Integer chatId
    ) throws ChatException, UserException {
        return ResponseEntity.ok(messageService.getChatMessages(chatId, token));
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<Message> findMessageById(@PathVariable("messageId") Integer messageId) throws MessageException {
        return ResponseEntity.ok(messageService.findMessageById(messageId));
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<String> deleteMessage(@PathVariable("messageId") Integer messageId,
                                                @RequestHeader("Authorization") String token) throws MessageException, UserException {
        messageService.deleteMessage(messageId, token);
        return ResponseEntity.ok("Message deleted successfully with id " + messageId);
    }




}
















