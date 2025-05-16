package com.devansh.service;

import com.devansh.exception.ChatException;
import com.devansh.exception.UserException;
import com.devansh.model.Chat;
import com.devansh.model.User;
import com.devansh.repo.ChatRepository;
import com.devansh.request.GroupChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;

    @Override
    public Chat createChat(String mainUserToken, Integer otherUserId) throws UserException {
        User mainUser = userService.findByJwtToken(mainUserToken);
        User otherUser = userService.findUnsafeUserById(otherUserId);

        Chat isChatExist = chatRepository.findSingleChatByUserIds(mainUser, otherUser);
        if (isChatExist != null) {
            return isChatExist;
        }

        Chat chat = new Chat();
        chat.setCreatedBy(mainUser);
        chat.getUsers().add(mainUser);
        chat.getUsers().add(otherUser);
        chat.setIsGroup(false);

        return chatRepository.save(chat);
    }

    @Override
    public Chat findChatById(Integer chatId) throws ChatException {
        Chat chat = chatRepository
                .findById(chatId)
                .orElseThrow(() -> new ChatException("Chat not found with id: " + chatId));
        return chat;
    }

    @Override
    public List<Chat> findAllChatByUserId(String mainUserToken) throws UserException {
        User user = userService.findByJwtToken(mainUserToken);
        List<Chat> allChats = chatRepository.findAllChatsByUserId(user.getId());
        return allChats;
    }

    @Override
    public Chat createGroup(GroupChatRequest request, String mainUserToken) throws UserException {

        User groupCreator = userService.findByJwtToken(mainUserToken);
        Chat group = new Chat();

        for (Integer userId: request.userIds()) {
            User user = userService.findUnsafeUserById(userId);
            group.getUsers().add(user);
        }
        group.getUsers().add(groupCreator);
        group.getAdmins().add(groupCreator);

        group.setIsGroup(true);
        group.setChatImage(request.chatImage());
        group.setChatName(request.chatName());
        group.setCreatedBy(groupCreator);

        return chatRepository.save(group);
    }

    @Override
    public Chat addUserToGroup(Integer userId, Integer chatId, String mainUserToken) throws UserException, ChatException {

        Chat chat = chatRepository
                .findById(chatId)
                .orElseThrow(() -> new ChatException("Chat not found with id: " + chatId));
        User user = userService.findUnsafeUserById(userId);
        User adminUser = userService.findByJwtToken(mainUserToken);

        if (!chat.getAdmins().contains(adminUser)) {
            throw new ChatException("Only admin can add users");
        }

        chat.getUsers().add(user);

        return chatRepository.save(chat);
    }

    @Override
    public Chat removeUserFromGroup(Integer chatId, Integer userId, String mainUserToken) throws UserException, ChatException {

        Chat chat = chatRepository
                .findById(chatId)
                .orElseThrow(() -> new ChatException("Chat not found with id: " + chatId));
        User user = userService.findUnsafeUserById(userId);
        User mainUser = userService.findByJwtToken(mainUserToken);

        if (!user.getId().equals(mainUser.getId())) {
            if (chat.getCreatedBy().equals(user)) {
                throw new ChatException("Group creator cannot be removed");
            }
        }

        if (chat.getAdmins().contains(mainUser)) {
            chat.getUsers().remove(user);
            if (chat.getAdmins().contains(user)) {
                chat.getAdmins().remove(user);
            }
            return chatRepository.save(chat);
        } else if (chat.getUsers().contains(mainUser)) {
            if (user.getId().equals(mainUser.getId())) {
                chat.getUsers().remove(mainUser);
                return chatRepository.save(chat);
            }
        }

        if (chat.getUsers().isEmpty()) {
            throw new ChatException("TODO: Chat size is 0 delete chat");
        }

        throw new ChatException("Only admin can remove users");
    }

    @Override
    public void deleteChat(Integer chatId, String mainUserToken) throws UserException, ChatException {
        Chat chat = chatRepository
                .findById(chatId)
                .orElseThrow(() -> new ChatException("Chat not found with id: " + chatId));
        User mainUser = userService.findByJwtToken(mainUserToken);

//        todo: I should remove the user from the chat instead of deleting the whole chat

        chatRepository.deleteById(chatId);
    }

    @Override
    public Chat updateChat(UpdateChatRequest request, String mainUserToken, Integer chatId) throws UserException, ChatException {
        Chat chat = chatRepository
                .findById(chatId)
                .orElseThrow(() -> new ChatException("Chat not found with id: " + chatId));
        User user = userService.findByJwtToken(mainUserToken);

        if (!chat.getAdmins().contains(user)) {
            throw new ChatException("Only admin can update");
        }

        chat.setChatName(request.chatName());
        chat.setChatImage(request.chatImage());

        return chatRepository.save(chat);
    }
}
