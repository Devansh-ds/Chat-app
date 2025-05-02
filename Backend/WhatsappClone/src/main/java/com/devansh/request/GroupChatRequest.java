package com.devansh.request;

import java.util.List;

public record GroupChatRequest(
        List<Integer> userIds,
        String chatName,
        String chatImage
) {
}
