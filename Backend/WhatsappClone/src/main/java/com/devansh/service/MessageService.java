package com.devansh.service;

import com.devansh.exception.ChatException;
import com.devansh.exception.MessageException;
import com.devansh.exception.UserException;
import com.devansh.model.Message;
import com.devansh.request.SendMessageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageService {

    Message sendMessage(SendMessageRequest req, String mainUserToken) throws UserException, ChatException;
    List<Message> getChatMessages(Integer chatId, String mainUserToken) throws ChatException, UserException;
    public Message findMessageById(Integer messageId) throws MessageException;
    void deleteMessage(Integer messageId, String mainUserToken) throws MessageException, UserException;

}
