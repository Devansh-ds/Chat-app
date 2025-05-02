package com.devansh.service;

import com.devansh.exception.ChatException;
import com.devansh.exception.UserException;
import com.devansh.model.Chat;
import com.devansh.request.GroupChatRequest;

import java.util.List;

public interface ChatService {

    Chat createChat(String mainUserToken, Integer otherUserId) throws UserException;
    Chat findChatById(Integer chatId) throws ChatException;
    List<Chat> findAllChatByUserId(String mainUserToken) throws UserException;
    Chat createGroup(GroupChatRequest request, String mainUserToken) throws UserException;
    Chat addUserToGroup(Integer userId, Integer chatId, String mainUserToken) throws UserException, ChatException;
    Chat removeUserFromGroup(Integer chatId, Integer userId, String mainUserToken) throws UserException, ChatException;
    void deleteChat(Integer chatId, String mainUserToken) throws UserException, ChatException;
    Chat updateChat(UpdateChatRequest request, String mainUserToken, Integer chatId) throws UserException, ChatException;

}
