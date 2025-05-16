package com.devansh.repo;

import com.devansh.model.Chat;
import com.devansh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("""
    select c from Chat c
        where c.isGroup=false
        and :mainUser member of c.users
        and :otherUser member of c.users
""")
    Chat findSingleChatByUserIds(@Param("mainUser") User mainUser, @Param("otherUser") User otherUser);

    @Query("SELECT c FROM Chat c JOIN c.users u WHERE u.id = :userId")
    List<Chat> findAllChatsByUserId(@Param("userId") Integer userId);


}














