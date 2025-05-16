package com.devansh.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String chatName;
    private String chatImage;

    @ManyToMany
    @JoinTable(
            name = "chat_admins",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "admins_id")
    )
    private Set<User> admins = new HashSet<>();

    @Column(name = "is_group")
    private Boolean isGroup;

    @ManyToOne
    private User createdBy;

    @ManyToMany
    @JoinTable(
            name = "chat_users",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id")
    )
    private Set<User> users = new HashSet<>();

    @OneToMany
    @JsonManagedReference
    private List<Message> messages = new ArrayList<>();

}














