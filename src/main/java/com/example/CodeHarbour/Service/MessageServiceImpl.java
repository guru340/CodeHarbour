package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Chat;
import com.example.CodeHarbour.Model.Message;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Repository.MessageRepo;
import com.example.CodeHarbour.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepo messageRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ProjectServices projectServices;


    @Override
    public Message sendMessage(Long SenderId, Long projectId, String Content) throws Exception {
        User sender=userRepo.findById(SenderId).orElseThrow(()->new Exception("User not found with id:"+SenderId));

        Chat chat=projectServices.getProjectbyId(projectId).getChat();

        Message message=new Message();
        message.setChat(chat);
        message.setContent(Content);
        message.setCreatedAt(LocalDateTime.now());
        message.setSenderAt(sender);
        Message savedmessage=messageRepo.save(message);
        chat.getMessages().add(savedmessage);
        return savedmessage;
    }

    @Override
    public List<Message> getMessagebyProjectId(Long ProjectId) throws Exception {
                Chat chat= projectServices.getProjectbyId(ProjectId).getChat();
        List<Message> findByChatOrderCreteadByAtAsc=messageRepo.findByChatIdOrderByCreatedAtAsc(chat.getId());
        return  findByChatOrderCreteadByAtAsc;
    }
}
