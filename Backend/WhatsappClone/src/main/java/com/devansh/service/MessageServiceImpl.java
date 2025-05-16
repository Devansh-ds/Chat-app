package com.devansh.service;

import com.devansh.exception.ChatException;
import com.devansh.exception.MessageException;
import com.devansh.exception.UserException;
import com.devansh.model.Chat;
import com.devansh.model.Message;
import com.devansh.model.User;
import com.devansh.repo.MessageRepository;
import com.devansh.request.SendMessageRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;
    private final ChatService chatService;

    @Override
    public Message sendMessage(SendMessageRequest req, String mainUserToken) throws UserException, ChatException {
        User user = userService.findByJwtToken(mainUserToken);
        Chat chat = chatService.findChatById(req.chatId());

        Message message = Message
                .builder()
                .chat(chat)
                .user(user)
                .content(req.content())
                .timestamp(LocalDateTime.now())
                .build();

        chat.getMessages().add(message);
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getChatMessages(Integer chatId, String mainUserToken) throws ChatException, UserException {
        Chat chat = chatService.findChatById(chatId);
        User user = userService.findByJwtToken(mainUserToken);
        if (!chat.getUsers().contains(user)) {
            throw new UserException("You are not authorized to view this message");
        }

        return messageRepository.findByChatId(chat.getId());
    }

    @Override
    public Message findMessageById(Integer messageId) throws MessageException {
        Message message = messageRepository
                .findById(messageId)
                .orElseThrow(() -> new MessageException("Message not found with id: " + messageId));
        return message;
    }

    @Override
    public void deleteMessage(Integer messageId, String mainUserToken) throws MessageException, UserException {
        Message message = messageRepository
                .findById(messageId)
                .orElseThrow(() -> new MessageException("Message not found with id: " + messageId));
        User user = userService.findByJwtToken(mainUserToken);
        if (message.getUser().getId() != user.getId()) {
            throw new UserException("You cannot delete other's messages");
        }
        messageRepository.deleteById(messageId);
    }
}