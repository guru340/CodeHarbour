package com.example.CodeHarbour.Service;

import com.example.CodeHarbour.Model.Message;
import org.apache.catalina.LifecycleState;

import java.util.List;

public interface MessageService {

    Message sendMessage(Long senderId,Long chatId,String Content) throws Exception;

    List<Message> getMessagebyProjectId(Long projectId) throws Exception;
}
