package com.example.CodeHarbour.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String content;

    private LocalDateTime createdAt;


    @ManyToOne
    @JsonIgnore
    private Chat chat;


    @ManyToOne
    @JsonIgnoreProperties({"password", "projectSize", "issue", "hibernateLazyInitializer"})
    private User senderAt; }