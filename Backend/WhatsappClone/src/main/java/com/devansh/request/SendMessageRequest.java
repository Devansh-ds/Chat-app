package com.devansh.request;

public record SendMessageRequest(
        Integer userId,
        Integer chatId,
        String content
) {
}
