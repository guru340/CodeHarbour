package com.example.CodeHarbour.Controller;

import com.example.CodeHarbour.Model.Chat;
import com.example.CodeHarbour.Model.Message;
import com.example.CodeHarbour.Model.User;
import com.example.CodeHarbour.Request.CreateMessageRequest;
import com.example.CodeHarbour.Service.MessageService;
import com.example.CodeHarbour.Service.ProjectServices;
import com.example.CodeHarbour.Service.UserServices;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @Autowired
    private ProjectServices projectServices;

    @Autowired
    private UserServices userServices;

    @PostMapping("/send")
    public ResponseEntity<Message> sendMail(@RequestBody CreateMessageRequest request) throws Exception{

        User user=userServices.findUserById(request.getSenderId());
        if (user==null){
            throw new Exception("User Not Found with id"+request.getSenderId());


        }
        Chat chats=projectServices.getProjectbyId(request.getProjectId()).getChat();
        if (chats==null){
            throw new Exception("Chats not found");
        }

        Message sentMessage =messageService.sendMessage(request.getSenderId(),request.getProjectId(),request.getContent());
        return ResponseEntity.ok(sentMessage);
    }

    @GetMapping("/chat/{projectId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Long projectId)throws Exception{
        List<Message> messageList=messageService.getMessagebyProjectId(projectId);
        return ResponseEntity.ok(messageList);
    }
}
