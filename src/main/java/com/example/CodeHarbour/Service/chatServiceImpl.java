package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Chat;
import com.example.CodeHarbour.Repository.ChatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class chatServiceImpl implements ChatService{

    @Autowired
    private ChatRepo chatRepo;

    @Override
    public Chat createChat(Chat chat) {
        return chatRepo.save(chat);
    }
}
